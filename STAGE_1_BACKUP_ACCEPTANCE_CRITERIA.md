# STAGE 1 — BACKUP ACCEPTANCE CRITERIA

**Document ID:** `STAGE_1_BACKUP_ACCEPTANCE_CRITERIA.md`  
**Project:** Career Button Website Control Center  
**Governance Owner:** Sole Human Approver  
**Target Operational Stage:** Stage 1 — Production Logical Backup Acquisition  
**Document Status:** [DOCUMENTED DESIGN] — PENDING HUMAN REVIEW  
**Operational Status:** [PROPOSED] — EXECUTION NOT AUTHORIZED  
**Classification:** FORMAL VERIFICATION AND ACCEPTANCE METRICS SPECIFICATION  

---

## 1. Purpose and Objective

### 1.1 Objective
This document defines the quantitative, measurable, and objective acceptance criteria required to formally evaluate the success of **Stage 1 (Production Logical Backup Acquisition)** for the *Career Button Website Control Center*.

### 1.2 Mandatory Governance Clarification
- **Classification:** [DOCUMENTED DESIGN] / [PROPOSED]
- **Recoverability Boundary:** In strict compliance with Antigravity governance standards:
  > **A SUCCESSFUL DUMP ALONE MUST NOT BE REPRESENTED AS PROOF OF RECOVERABILITY.**  
  > Acquisition of a valid `.dump` file confirms only that data was extracted by the client utility without reported errors. It does **not** prove that the target schema can be restored cleanly, that constraints will validate, that dependent foreign keys are consistent, or that application logic will function upon restoration.

---

## 2. Measurable Acceptance Criteria Matrix

To achieve formal acceptance, an acquired backup artifact must satisfy 100% of the following criteria without exception:

| Criterion ID | Domain | Measurable Requirement | Verification Method | Evaluation Threshold | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **AC-01** | **Tooling** | Exact client version and binary path recorded | `pg_dump --version` recorded in log | PostgreSQL client major version matches or exceeds server major version (e.g., 15.x) | [PROPOSED] |
| **AC-02** | **Exit Status** | Zero exit status code on acquisition process | Process exit code capture (`$?`) | Exit code must equal exactly `0`; zero warnings in log | [PROPOSED] |
| **AC-03** | **Archive Integrity** | Archive structure conforms to PostgreSQL custom format | `pg_restore --list [ARCHIVE]` executes without errors | Valid custom header, readable TOC, zero corruption flags | [PROPOSED] |
| **AC-04** | **Cryptographic Hash** | SHA-256 digest calculated and recorded | `sha256sum [ARCHIVE]` output documented | 64-character valid hexadecimal digest stored in companion `.sha256` manifest | [PROPOSED] |
| **AC-05** | **File Metadata** | Exact file byte count and timestamps recorded | `stat -f "%z %Sm" [ARCHIVE]` / `ls -la` | Non-zero byte size (> 100 KB based on baseline); ISO-8601 UTC timestamps | [PROPOSED] |
| **AC-06** | **Schema Scope** | Data scope matches approved application boundaries | Parse output of `pg_restore --list` | Only approved `public` application relations captured; zero unexpected schemas | [PROPOSED] |
| **AC-07** | **Exclusion Audit** | Managed and internal schemas strictly omitted | Regex inspection of TOC manifest | Complete absence of `auth.*`, `storage.*`, `vault.*`, `graphql.*`, `realtime.*` | [PROPOSED] |
| **AC-08** | **Storage & Security** | Stored in approved encrypted destination | Filesystem check (`ls -ld`, `stat`) | Directory permissions `0700`, file permissions `0600`; AES-256 encrypted at rest | [PROPOSED] |
| **AC-09** | **Secret Sanitization** | Zero credentials or tokens present in output/logs | Automated pattern scan (`grep -iE "password|token|secret|eyJh"`) | Zero credential, API key, or JWT matches in session logs | [PROPOSED] |
| **AC-10** | **Reviewability** | Evidence package independently reviewable | Verification script review by Sole Human Approver | Standalone bundle containing metadata, TOC, hashes, and logs without requiring live DB access | [PROPOSED] |

---

## 3. Detailed Verification Procedures

### 3.1 Verification of Tooling and Exit Status (AC-01, AC-02)
- The execution wrapper must log the exact environment:
  ```bash
  # Verification Step
  which pg_dump >> stage1_execution.log
  pg_dump --version >> stage1_execution.log
  # Following execution:
  echo "EXIT_STATUS: $?" >> stage1_execution.log
  ```
- **Acceptance Condition:** If exit status != `0`, the acquisition is classified as **FAILED** and the abort procedure is immediately invoked.

### 3.2 Verification of Archive Header and Table of Contents (AC-03, AC-06, AC-07)
- The Table of Contents (TOC) must be extracted and audited:
  ```bash
  # Generate TOC manifest
  pg_restore --list career_button_prod_stage1.dump > stage1_toc_manifest.txt
  ```
- **Auditing Schema Containment:**
  - Count of objects in `public`: `> 0`
  - Count of objects in `auth`: `== 0`
  - Count of objects in `storage`: `== 0`
  - Count of objects in `vault`: `== 0`
- **Acceptance Condition:** Any entry belonging to a managed schema constitutes an immediate security failure.

### 3.3 Verification of Cryptographic Digest (AC-04)
- Generate SHA-256:
  ```bash
  shasum -a 256 career_button_prod_stage1.dump > career_button_prod_stage1.dump.sha256
  shasum -a 256 career_button_prod_stage1.dump.enc > career_button_prod_stage1.dump.enc.sha256
  ```
- **Acceptance Condition:** Hashes must match across duplicate reads and must be signed/acknowledged by the operator.

### 3.4 Verification of Log Hygiene (AC-09)
- Run sanitization regex against execution logs:
  ```bash
  grep -iE "(password|secret|bearer|token|service_role)" stage1_execution.log
  ```
- **Acceptance Condition:** Output must be strictly empty (zero matches).

---

## 4. Evidence Package Deliverables Checklist

An evidence bundle named `career_button_stage1_evidence_[TIMESTAMP].tar.gz` must be constructed containing:
- [ ] `stage1_execution.log` (Sanitized execution log with timestamps, tool versions, and exit code).
- [ ] `stage1_toc_manifest.txt` (Full `pg_restore --list` output).
- [ ] `career_button_prod_stage1.dump.sha256` (SHA-256 hash file for unencrypted dump).
- [ ] `career_button_prod_stage1.dump.enc.sha256` (SHA-256 hash file for encrypted archive).
- [ ] `stage1_verification_verdict.txt` (Summary report confirming all 10 criteria met).

---

## 5. Formal Verdict Determinations

The Sole Human Approver will assign one of the following formal verdicts upon review of the evidence package:

1. **ACCEPTED:** All 10 acceptance criteria verified; evidence complete, authentic, and compliant.
2. **REJECTED — INTEGRITY FAILURE:** Checksum mismatch, non-zero exit status, or corrupt archive structure.
3. **REJECTED — SCOPE VIOLATION:** Managed schemas or unintended data captured in TOC.
4. **REJECTED — SECURITY VIOLATION:** Credential leakage or failure to enforce encryption at rest/in transit.

---

## 6. Explicit Non-Authorization Declaration

> **CRITICAL GOVERNANCE STATEMENT:**  
> These acceptance criteria define **EVALUATION METRICS ONLY**.  
> Defining how an operation will be judged does **NOT** grant authorization to perform it.  
> Execution remains strictly **NOT AUTHORIZED**.

---
*End of Stage 1 Backup Acceptance Criteria.*

