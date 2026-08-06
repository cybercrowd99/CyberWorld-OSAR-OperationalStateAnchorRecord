/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityVerification Artifact
 * 
 * OSARProjectionAssuranceIntegrityVerification defines the bounded verification
 * layer responsible for recording structural verification of an integrity-ledger
 * checkpoint.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 * - create financial-ledger semantics
 *
 * Verification representation only:
 * - preserves integrity-ledger lineage
 * - records verification references
 * - maintains immutable checkpoints
 * - supports structural integrity verification
 */

import {
  OSARProjectionAssuranceIntegrityLedger,
  validateOSARProjectionAssuranceIntegrityLedger,
} from "./osar-projection-assurance-integrity-ledger";

export type OSARProjectionAssuranceIntegrityVerificationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_VERIFICATION_RECORDED";

export type OSARProjectionAssuranceIntegrityVerificationDecision =
  | "VERIFIED"
  | "REVIEW"
  | "INVALID";

export interface OSARProjectionAssuranceIntegrityVerification {
  readonly status:
    OSARProjectionAssuranceIntegrityVerificationStatus;

  readonly integrityLedgerReference:
    string;

  readonly verificationReference:
    string;

  readonly lineage:
    readonly string[];

  readonly decision:
    OSARProjectionAssuranceIntegrityVerificationDecision;

  readonly createdAt:
    string;
}

export function createOSARProjectionAssuranceIntegrityVerification(input: {
  integrityLedger:
    OSARProjectionAssuranceIntegrityLedger;

  verificationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityVerification {

  const valid =
    validateOSARProjectionAssuranceIntegrityLedger(
      input.integrityLedger,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_VERIFICATION_RECORDED",

    integrityLedgerReference:
      input.integrityLedger.integrityLedgerReference,

    verificationReference:
      input.verificationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityLedger.decision === "RECORDED" &&
      input.verificationReference.length > 0 &&
      input.lineage.length > 0
        ? "VERIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

export function validateOSARProjectionAssuranceIntegrityVerification(
  verification:
    OSARProjectionAssuranceIntegrityVerification,
): boolean {

  return (
    verification.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_VERIFICATION_RECORDED" &&
    verification.integrityLedgerReference.length > 0 &&
    verification.verificationReference.length > 0 &&
    verification.lineage.length > 0 &&
    verification.createdAt.length > 0 &&
    (
      verification.decision === "VERIFIED" ||
      verification.decision === "REVIEW" ||
      verification.decision === "INVALID"
    )
  );
}
