import crypto from 'node:crypto';

/**
 * Production-grade password hashing using Node.js native scrypt.
 * Generates a 16-byte random salt and a 64-byte derived key.
 */
export function hashPassword(password: string, existingSalt?: string): { hash: string; salt: string } {
  const salt = existingSalt || crypto.randomBytes(16).toString('hex');
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return {
    hash: derivedKey.toString('hex'),
    salt,
  };
}

/**
 * Verify a plain text password against a stored scrypt hash and salt.
 * Uses timingSafeEqual to guard against timing attacks.
 */
export function verifyPassword(password: string, hash: string, salt: string): boolean {
  try {
    const derivedKey = crypto.scryptSync(password, salt, 64);
    const storedBuffer = Buffer.from(hash, 'hex');
    return crypto.timingSafeEqual(derivedKey, storedBuffer);
  } catch {
    return false;
  }
}

/**
 * Generate a cryptographically secure random session token / ID.
 */
export function generateToken(bytes = 32): string {
  return crypto.randomBytes(bytes).toString('hex');
}

/**
 * Sign payload using HMAC-SHA256 for secure session cookies.
 */
export function signPayload(payload: object, secret: string): string {
  const jsonStr = JSON.stringify(payload);
  const base64Payload = Buffer.from(jsonStr).toString('base64url');
  const signature = crypto.createHmac('sha256', secret).update(base64Payload).digest('base64url');
  return `${base64Payload}.${signature}`;
}

/**
 * Verify HMAC-SHA256 signature and return decoded payload.
 */
export function verifySignedPayload<T = unknown>(token: string, secret: string): T | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [base64Payload, signature] = parts;
    const expectedSig = crypto.createHmac('sha256', secret).update(base64Payload).digest('base64url');
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }
    const jsonStr = Buffer.from(base64Payload, 'base64url').toString('utf8');
    return JSON.parse(jsonStr) as T;
  } catch {
    return null;
  }
}
