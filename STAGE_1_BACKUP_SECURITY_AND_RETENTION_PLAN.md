# STAGE 1 — BACKUP SECURITY AND RETENTION PLAN

**Document ID:** `STAGE_1_BACKUP_SECURITY_AND_RETENTION_PLAN.md`  
**Project:** Career Button Website Control Center  
**Governance Owner:** Sole Human Approver  
**Target Operational Stage:** Stage 1 — Production Logical Backup Acquisition  
**Document Status:** [DOCUMENTED DESIGN] — PENDING HUMAN REVIEW  
**Operational Status:** [PROPOSED] — EXECUTION NOT AUTHORIZED  
**Classification:** DATA SECURITY, STORAGE GOVERNANCE & RETENTION SPECIFICATION  

---

## 1. Scope and Security Objectives

### 1.1 Objective
This plan establishes the mandatory cryptographic, architectural, and retention standards governing any production logical backup acquired during **Stage 1** for the *Career Button Website Control Center*.

### 1.2 Boundary & Compliance Declarations
- **Classification:** [DOCUMENTED DESIGN] / [PROPOSED]
- **Regulatory Clarification:** In strict adherence to governance instructions, **NO UNVERIFIED CLAIMS** of formal regulatory, statutory, or legal compliance (e.g., GDPR, HIPAA, SOC 2, ISO 27001) are made herein. Security standards are defined strictly in terms of technical engineering controls, cryptographic verification, and operational least privilege.

---

## 2. Encryption Controls

### 2.1 Encryption in Transit (EIT)
All network traffic between the execution host and the production PostgreSQL database must be encrypted end-to-end:
- **Protocol:** TLS 1.3 preferred; TLS 1.2 minimum allowable baseline [DOCUMENTED DESIGN].
- **Cipher Suites:** Modern forward-secrecy cipher suites only (e.g., `TLS_AES_256_GCM_SHA384`, `ECDHE-RSA-AES256-GCM-SHA384`).
- **Certificate Verification:** Enforced via `sslmode=verify-full` or `sslmode=verify-ca`. The server's X.509 certificate must validate against the trusted Supabase root certificate authority bundle.
- **Cleartext Invalidation:** Any connection negotiation that attempts to downgrade to plaintext or fails certificate validation must trigger an immediate operational abort.

### 2.2 Encryption at Rest (EAR)
Any logical dump file written to local storage must be encrypted immediately upon creation:
- **Algorithm:** AES-256-GCM (Authenticated Encryption with Associated Data) or GPG symmetric encryption with AES-256.
- **Pipeline Implementation:** Where supported by host utilities, encryption must occur in a UNIX stream pipe without writing unencrypted intermediary files to non-volatile disk:
  ```bash
  # PROPOSED SECURE STREAM PIPE (NOT EXECUTED)
  pg_dump [OPTIONS] | gpg --batch --yes --symmetric --cipher-algo AES256 --passphrase-file [PASS_FD] -o [BACKUP_FILE].dump.gpg
  ```
- **Fallback Execution:** If streamed encryption is unavailable, the unencrypted dump file written to local RAM-disk or an encrypted APFS volume must be immediately encrypted, followed by an immediate multi-pass zeroing (`shred` / `srm`) of the unencrypted file.

---

## 3. Key Management and Access Separation

### 3.1 Key Generation and Entropy
- **Passphrase Generation:** Symmetric encryption keys must be generated using a cryptographically secure pseudorandom number generator (`/dev/urandom` or `openssl rand -base64 32`).
- **Minimum Entropy:** 256 bits of true cryptographic entropy.

### 3.2 Access Separation Model
- **Key Separation:** The encryption key must **NEVER** be stored in the same directory, volume, or repository as the encrypted backup file.
- **Transient Memory Model:** The encryption key must exist only in volatile system memory during the encryption process and must be purged immediately after execution.
- **Human Split Control:** For disaster recovery retention, the symmetric passphrase must be split or encrypted with the public key of the Sole Human Approver.
- **Zero Repository Exposure:** Keys, passphrases, and key fragments are strictly forbidden from being checked into Git, committed to branches, or included in build artifacts.

---

## 4. Sensitive Data Handling and Sanitization

### 4.1 Scope Quarantine
- **Exclusion of Identity Systems:** The production `auth` schema containing user hashes, credentials, tokens, and identities is completely excluded from the acquisition scope [MANDATORY TECHNICAL BOUNDARY].
- **Application Secrets Sanitization:** Any application-level tokens, session cookies, or encrypted columns within `public` relations must remain encrypted under their respective application layers.

### 4.2 Logging Sanitization
- **Strict Log Hygiene:** Ordinary operational logs, execution outputs, and process monitors must never capture:
  - Database connection strings or passwords (`PGPASSWORD`).
  - Raw table data containing Personally Identifiable Information (PII).
  - Cryptographic keys or passphrases.
- **Process Hiding:** Command lines executed must not expose credentials via `ps` or process tables (avoid flags like `-W` or `--password=VALUE`; use standard environment variables or pipe file descriptors).

---

## 5. Backup Cryptographic Integrity Verification

To prove that an acquired backup file has not suffered bit rot, truncation, or tampering, the following two-stage cryptographic verification is required:

### 5.1 Checksum Calculation
- **Algorithm:** SHA-256 (FIPS 180-4 standard).
- **Generation:** Immediately upon completion of the dump and its encrypted container:
  ```bash
  sha256sum [BACKUP_FILE].dump.gpg > [BACKUP_FILE].dump.gpg.sha256
  ```
- **Recording:** The resulting 64-character hexadecimal digest must be recorded in the formal Stage 1 Evidence Package.

### 5.2 Archive Header and TOC Validation
- **Structure Validation:** Using `pg_restore --list`, inspect the custom archive Table of Contents without performing any database write or restore operation.
- **Non-Zero Object Check:** Validate that the captured relation count matches expected application table counts and that file size > 0 bytes.
- **Recoverability Caveat:** In accordance with governance rules, **a valid archive header and successful dump DO NOT prove successful restoration**. Restoration capability can only be demonstrated through a separate, authorized restore testing stage.

---

## 6. Retention and Deletion Policy

### 6.1 Authorized Retention Lifecycle

| Lifecycle State | Duration | Storage Location | Operational Condition | Governance Action |
| :--- | :--- | :--- | :--- | :--- |
| **Active Staging** | Maximum 7 calendar days | Dedicated local encrypted directory (`0700`) | Prior to downstream migration analysis | Preserved with cryptographic hashes |
| **Archival Retention** | Maximum 30 calendar days | Offline encrypted cold storage | Requires explicit human approval | Transferred only if authorized |
| **Purge / Deletion** | Post-migration or upon abort | All local storage locations | Expiration of retention window or abort trigger | Cryptographic wipe & file shredding |

### 6.2 Secure Destruction Procedure
When the retention period expires, or upon an abort trigger:
1. The encrypted archive and all associated hash manifests must be securely overwritten:
   ```bash
   # SECURE DESTRUCTION (PROPOSED)
   rm -P [BACKUP_FILE].dump.gpg || shred -u -z -n 3 [BACKUP_FILE].dump.gpg
   ```
2. The storage location must be inspected to ensure zero orphaned temporary files remain.
3. A formal destruction certificate containing the deletion timestamp and target SHA-256 must be presented to the Sole Human Approver.

---

## 7. Audit Trail Requirements

A permanent, immutable audit log must be maintained for all Stage 1 operational activities:
1. **Operator Identity:** Terminal user and host hostname.
2. **Timestamps:** Exact ISO-8601 UTC start and finish timestamps.
3. **Command Signature:** Sanitized command string invoked (passwords masked).
4. **Tool Versions:** Exact outputs of `pg_dump --version`, `gpg --version`, and `openssl version`.
5. **Artifact Dimensions:** Exact file size in bytes and verified SHA-256 checksums.
6. **Integrity Verdict:** Pass/Fail outcome of archive TOC inspection.

---

## 8. Explicit Non-Authorization Declaration

> **CRITICAL GOVERNANCE STATEMENT:**  
> This security and retention plan is a **DOCUMENTED DESIGN ONLY**.  
> It does **NOT** authorize execution of backup acquisition, credential access, or filesystem allocation.  
> Execution remains strictly **BLOCKED** pending human authorization.

---
*End of Stage 1 Backup Security and Retention Plan.*

