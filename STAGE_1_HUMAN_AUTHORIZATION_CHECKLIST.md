# STAGE 1 — HUMAN AUTHORIZATION CHECKLIST

**Document ID:** `STAGE_1_HUMAN_AUTHORIZATION_CHECKLIST.md`  
**Project:** Career Button Website Control Center  
**Governance Owner:** Sole Human Approver  
**Target Operational Stage:** Stage 1 — Production Logical Backup Acquisition  
**Document Status:** [DOCUMENTED DESIGN] — PENDING HUMAN REVIEW  
**Operational Status:** [PROPOSED] — ALL DECISIONS STRICTLY UNAPPROVED  
**Classification:** MANDATORY HUMAN GOVERNANCE GATE & SIGN-OFF INSTRUMENT  

---

## 1. Instructions for the Sole Human Approver

This checklist contains the explicit, non-delegable decisions required to authorize **Stage 1 (Production Logical Backup Acquisition)** for the *Career Button Website Control Center*.

In accordance with Antigravity governance standards:
- **ALL DECISIONS ARE CURRENTLY SET TO `UNAPPROVED`.**
- No automated system, assistant, subagent, or script may approve, check, or bypass any item.
- Authorizations are separated: Gate 1.5 execution authorization and Stage 1 operational authorization are distinct and neither implies the other.
- Authorizing this stage **DOES NOT** authorize restore testing, preflight modifications, or schema migration.

---

## 2. Explicit Human Authorization Decision Items

### Decision Item 1: Authorization of Production Database Network Access
- **Proposed Action:** Establish an encrypted TLS 1.3/1.2 read-only database connection to the production PostgreSQL endpoint (`port 5432`).
- **Least-Privilege Standard:** Restricted read-only user (`CONNECT`, `USAGE`, `SELECT` on `public` schema only).
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **APPROVED** — Explicitly authorize read-only network access.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

### Decision Item 2: Authorization of Logical Backup Creation via `pg_dump`
- **Proposed Action:** Execute a non-blocking logical schema-and-data dump (`pg_dump -Fc --schema=public`) of application tables in the `public` schema.
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **APPROVED** — Explicitly authorize logical backup creation.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

### Decision Item 3: Authorization of Encrypted Backup Storage
- **Proposed Action:** Store the captured `.dump` archive on the local secure volume with dual-layer encryption (AES-256-GCM symmetric encryption at rest and restrictive `0600` POSIX permissions).
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **APPROVED** — Explicitly authorize encrypted local storage.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

### Decision Item 4: Authorization of Cryptographic Integrity Verification
- **Proposed Action:** Execute `sha256sum` calculation and non-invasive table-of-contents extraction (`pg_restore --list`) to verify archive structure and hash consistency.
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **APPROVED** — Explicitly authorize cryptographic and TOC verification.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

### Decision Item 5: Approval of Retention Period and Local Destination Path
- **Proposed Action:** Authorize an active staging retention window of maximum **7 calendar days**, stored strictly at `[SECURE_STORAGE_ROOT]/backups/career_button/stage1/`, followed by verified secure file shredding.
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **APPROVED** — Explicitly approve 7-day retention period and destination path.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

### Decision Item 6: Confirmation of Excluded Schemas, Data, and Resources
- **Proposed Action:** Confirm and enforce that managed schemas (`auth`, `storage`, `vault`, `graphql`, `realtime`) and platform assets (Storage blobs, Edge Functions, environment secrets) are **STRICTLY EXCLUDED** from acquisition.
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **CONFIRMED & APPROVED** — Explicitly confirm exclusions.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

### Decision Item 7: Confirmation that Restore Testing is EXCLUDED
- **Proposed Action:** Acknowledge and confirm that this Stage 1 authorization package covers **ACQUISITION ONLY** and that database restoration testing, test restores, rollback validation, and migration execution are **STRICTLY PROHIBITED** and require separate future authorization instruments.
- **Current Status:** `[UNAPPROVED — PENDING HUMAN DECISION]`
- **Human Decision:**
  - [ ] **CONFIRMED & APPROVED** — Explicitly acknowledge restore testing is excluded.
  - [x] **NOT APPROVED / BLOCKED** — Default state.
- **Approver Signature:** ____________________  
- **Date / Timestamp (UTC):** ____________________  

---

## 3. Governance Summary and Status Declaration

| Item | Governance Question | Response |
| :--- | :--- | :--- |
| **All 7 Decisions Approved?** | Have all 7 decision items been individually signed and approved? | **NO** (0 of 7 Approved) |
| **Gate 1.5 Execution Authorized?** | Has separate Gate 1.5 execution authorization been ratified? | **NO** (Not Authorized) |
| **Stage 1 Operational Permission?** | Is permission granted to run `pg_dump` or connect to production? | **NO** (Execution Blocked) |
| **Current Operational Verdict** | What is the overall governance state? | **STAGE 1 — EXECUTION NOT AUTHORIZED** |

---

## 4. Approver Formal Action

To grant authorization for Stage 1 execution, the Sole Human Approver must manually edit this file, check the `[APPROVED]` boxes, enter digital signatures and timestamps, and submit the modified document with an explicit instruction: `"AUTHORIZE STAGE 1 EXECUTION"`.

Until that event occurs, all tools, scripts, and operators must remain in a strict read-only, non-operational state.

---
*End of Stage 1 Human Authorization Checklist.*

