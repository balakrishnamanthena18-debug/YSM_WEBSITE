# STAGE 1 — PRODUCTION LOGICAL BACKUP ACQUISITION AUTHORIZATION REQUEST

**Document ID:** `STAGE_1_BACKUP_ACQUISITION_AUTHORIZATION_REQUEST.md`  
**Project:** Career Button Website Control Center  
**Governance Owner:** Sole Human Approver  
**Target Operational Stage:** Stage 1 — Production Logical Backup Acquisition  
**Document Status:** [DOCUMENTED DESIGN] — PENDING HUMAN REVIEW  
**Operational Status:** [PROPOSED] — EXECUTION NOT AUTHORIZED  
**Classification:** STRICTLY HUMAN-REVIEWABLE AUTHORIZATION INSTRUMENT  

---

## 1. Executive Purpose and Operational Scope

### 1.1 Purpose
This document constitutes the formal request for authorization to execute **Stage 1 (Production Logical Backup Acquisition)** for the *Career Button Website Control Center*. Its sole purpose is to acquire a verified, point-in-time, read-only logical backup of authorized application schemas and tables from the production database prior to any downstream consideration of migration activities.

### 1.2 Boundary Classification
- **Classification:** [DOCUMENTED DESIGN] / [PROPOSED]
- **Operational Execution State:** **NOT AUTHORIZED**.
- **Scope Limit:** Logical PostgreSQL dump (`pg_dump`) of application data only.
- **Explicit Exclusion:** This request **DOES NOT** request or grant authorization for:
  - Database restore testing or schema modification.
  - Supabase Auth state, user credentials, or MFA factor acquisition.
  - Supabase Storage bucket or blob object acquisition.
  - Edge function code, configuration, or environment secret extraction.
  - Schema migration execution (Gate 2 / Gate 2B remain strictly LOCKED / NOT AUTHORIZED).

---

## 2. Production Environment Identification (Non-Invasive)

To identify the targeted production environment without executing any active connection, querying, or credential disclosure:

| Identifier Attribute | Identification Method | Governance Label |
| :--- | :--- | :--- |
| **Project Reference** | Static reference match against documented Gate 1 project reference identifier: `career-button-prod` | [DOCUMENTED DESIGN] |
| **Database Host Endpoint** | Canonical hostname pattern verified via Gate 1 accepted configuration records (e.g., `db.<project-ref>.supabase.co`) without DNS probe | [DOCUMENTED DESIGN] |
| **Port & Protocol** | Standard PostgreSQL TLS port `5432` / connection pooler port `6543` (transaction mode excluded; direct session mode required for pg_dump) | [DOCUMENTED DESIGN] |
| **Target Database Name** | `postgres` (standard PostgreSQL root database for Supabase instances) | [DOCUMENTED DESIGN] |
| **Active Verification State** | **UNVERIFIED AT RUNTIME**. Runtime connection verification will occur only if explicit human authorization is granted. | [UNVERIFIED] |

*Zero network packets, API calls, or connection attempts have been or will be made during the preparation of this request.*

---

## 3. Proposed Backup Method and Format

### 3.1 Proposed Tooling
- **Client Utility:** `pg_dump` (PostgreSQL Client Utility version matching server major release: PostgreSQL 15.x).
- **Execution Mode:** Non-blocking, read-only snapshot transaction (`--transaction-size` / single transaction isolation snapshot).
- **Format:** Custom Archive Format (`-Fc` / `--format=custom`).
  - *Rationale for Custom Format:* Supports selective restore, built-in zlib compression, object-level table-of-contents (`pg_restore --list`), and cryptographic integrity validation without plain text disclosure on disk.

### 3.2 Proposed Command Shape (Subject to Human Approval)
```bash
# PROPOSED COMMAND — NOT EXECUTED — PENDING GATE 1.5 AND STAGE 1 APPROVAL
pg_dump \
  --host="[PROD_DB_HOST]" \
  --port="5432" \
  --username="[READ_ONLY_BACKUP_USER]" \
  --dbname="postgres" \
  --format=custom \
  --compress=9 \
  --no-owner \
  --no-privileges \
  --schema="public" \
  --exclude-table-data="*.secret_*" \
  --file="[ENCRYPTED_TARGET_PATH]/career_button_prod_stage1_backup.dump"
```
*[REQUIRES HUMAN APPROVAL]*: The exact flags, target schemas, and output file paths must be ratified by the Sole Human Approver before execution.

---

## 4. Proposed Database Objects and Data Scope

### 4.1 In-Scope Schemas & Objects [PROPOSED]
The acquisition is strictly confined to user-space application schemas:
1. **Schema:** `public`
   - Application relation tables (e.g., application control state, content configurations, site metadata).
   - Application sequences and custom types defined strictly in `public`.
   - Application views and indexes defined strictly in `public`.

### 4.2 Explicit Exclusions [MANDATORY TECHNICAL BOUNDARY]
The following schemas and systems are **STRICTLY EXCLUDED** from this logical backup:
1. **Supabase Internal & Managed Schemas:**
   - `auth` (User credentials, password hashes, identities, refresh tokens, MFA factors)
   - `storage` (Storage object metadata, bucket policies)
   - `graphql`, `graphql_public`
   - `realtime`
   - `supabase_functions`
   - `supabase_migrations`
   - `vault` (Encrypted secrets, keys)
   - `pgcrypto`, `pg_catalog`, `information_schema`
2. **Non-Database Supabase Platform Resources:**
   - S3-compatible Storage blob objects.
   - Supabase Auth microservice configurations and webhook secrets.
   - Edge Functions, Deno runtime secrets, and custom environment variables.
   - API Gateway rate limit rules and project settings.

---

## 5. Required Credentials and Least-Privilege Access Model

### 5.1 Principle of Least Privilege
- **Access Level:** Dedicated read-only logical dump role.
- **Prohibited Roles:** The `postgres` superuser, `supabase_admin` system role, and `service_role` full-access JWT must **NOT** be used if a restricted read-only role can be provisioned.
- **Privilege Grants Required:**
  - `CONNECT ON DATABASE postgres`
  - `USAGE ON SCHEMA public`
  - `SELECT ON ALL TABLES IN SCHEMA public`
  - `SELECT ON ALL SEQUENCES IN SCHEMA public`
- **Credential Storage:**
  - In-memory environment variable (`PGPASSWORD`) or temporary standard `.pgpass` file with `0600` POSIX permissions.
  - Zero hardcoding of credentials in scripts, logs, markdown artifacts, or repository commits.
  - Credentials must be immediately un-set upon command completion or abort.

---

## 6. TLS Requirements Based on Accepted Gate 1 Evidence

### 6.1 Enforced TLS Protocol [VERIFIED EVIDENCE & DOCUMENTED DESIGN]
Based on accepted Gate 1 baseline documentation:
- **Minimum Protocol:** TLSv1.3 (fallback to TLSv1.2 permitted only if validated against Gate 1 host capabilities).
- **SSL Mode:** `sslmode=verify-full` (or `sslmode=verify-ca` using the verified Supabase Root Certificate Authority bundle).
- **Certificate Validation:** Hostname identity verification must match the official Supabase database certificate Common Name / SAN.
- **Cleartext Fallback:** Strictly prohibited. If TLS negotiation fails or certificate verification is rejected, the process must immediately abort.

---

## 7. Proposed Backup Destination and Encryption Requirements

### 7.1 Storage Destination
- **Location:** Dedicated, air-gapped local secure volume or dedicated encrypted directory:
  `[SECURE_STORAGE_ROOT]/backups/career_button/stage1/`
- **Filesystem Permissions:** Restrictive directory permissions (`0700`) and file permissions (`0600`). Owner-only access.

### 7.2 Encryption at Rest
- **Mechanism:** Dual-layer protection:
  1. Base volume encryption (macOS FileVault / APFS Encrypted or LUKS).
  2. File-level symmetric encryption: AES-256-GCM via GPG/OpenSSL immediately upon acquisition:
     `gpg --symmetric --cipher-algo AES256 [BACKUP_FILE].dump -> [BACKUP_FILE].dump.enc`
- **Key Management:** Encryption passphrase generated via cryptographically secure random source (CSPRNG), held in transient volatile memory, never persisted to disk or logs.

---

## 8. Expected Evidence and Deliverables

Upon completion of Stage 1 (if authorized), the operation must deliver an independently reviewable evidence package containing:
1. **Execution Metadata Record:**
   - Exact client `pg_dump` binary path and version output (`pg_dump --version`).
   - Execution start and completion timestamps (UTC, ISO-8601).
   - Process exit status code (`0` required).
2. **Cryptographic Manifest:**
   - SHA-256 hash of the unencrypted dump file (pre-encryption): `career_button_prod_stage1.dump.sha256`.
   - SHA-256 hash of the encrypted archive (post-encryption): `career_button_prod_stage1.dump.enc.sha256`.
   - File byte count and block allocation.
3. **Object Manifest:**
   - Manifest generated via `pg_restore --list career_button_prod_stage1.dump` documenting all captured schemas, tables, and sequences.
   - Verification checklist demonstrating 0 excluded schemas/tables were captured.
4. **Sanitized Session Audit Log:**
   - Clean stderr/stdout log confirming zero warnings, zero TLS degradation, and zero credential leakage.

---

## 9. Estimated Operational Risks and Impact Analysis

| Risk Category | Inherent Risk | Likelihood | Impact | Mitigation / Safeguard |
| :--- | :--- | :--- | :--- | :--- |
| **Production Read Contention** | `pg_dump` holds `ACCESS SHARE` locks on tables during read phase | Low | Low-Medium | Non-blocking `ACCESS SHARE` permits concurrent `SELECT`, `INSERT`, `UPDATE`, `DELETE`. Single snapshot transaction prevents prolonged blocking. |
| **I/O & CPU Spike** | Database disk read and CPU compression overhead | Low | Low | Compression performed on client side (`-Z 9` client CPU), offloading database instance compute. |
| **Network Degradation** | High data transfer saturates egress bandwidth | Medium | Low | Single schema (`public`) logical size is small; compression minimizes bandwidth utilization. |
| **Connection Timeout** | Transaction exceeds statement or idle timeouts | Low | Low | Connection pooler bypassed; direct database port used with explicit keepalive settings. |
| **Security Leakage** | Exposure of sensitive business data in plain text | Medium | High | Immediate AES-256 encryption at rest; storage in `0600` permission directory; no repo staging. |

---

## 10. Stop and Abort Conditions

The operation must be halted immediately if any of the following occur:
1. **TLS / Certificate Error:** Inability to verify host certificate or negotiate TLS 1.2+.
2. **Credential / Auth Failure:** Authentication failure on first attempt (prevents brute-force lockouts).
3. **Scope Anomaly:** Any attempt by `pg_dump` to read or access `auth`, `storage`, or `vault` tables.
4. **Disk Capacity Breach:** Available destination disk space is less than 5x estimated uncompressed dump size.
5. **Database Load Threshold:** Production connection count spikes or query latency increases exceed pre-agreed operational baseline.
6. **Integrity Error:** Exit status != 0 or corrupt block encountered.

---

## 11. Explicit Non-Authorization Declaration

> **CRITICAL GOVERNANCE STATEMENT:**  
> This document is an **AUTHORIZATION REQUEST ONLY**.  
> Neither this document nor any prior Gate acceptance constitutes permission to run `pg_dump`, connect to production, or access credentials.  
> Operational execution remains **STRICTLY PROHIBITED** until the Sole Human Approver signs and ratifies `STAGE_1_HUMAN_AUTHORIZATION_CHECKLIST.md`.

---
*End of Stage 1 Backup Acquisition Authorization Request.*

