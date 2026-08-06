/**
 * CyberWorld-OSAR — OSARProjectionAssuranceVerification Artifact
 * 
 * OSARProjectionAssuranceVerification defines the bounded verification layer
 * responsible for recording structural verification of an assurance ledger
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
 * - preserves assurance-ledger lineage
 * - records verification references
 * - maintains immutable checkpoints
 * - supports structural verification review
 */

import {
  OSARProjectionAssuranceLedger,
  validateOSARProjectionAssuranceLedger,
} from "./osar-projection-assurance-ledger";

export type OSARProjectionAssuranceVerificationStatus =
  | "PROJECTION_ASSURANCE_VERIFICATION_RECORDED";

export type OSARProjectionAssuranceVerificationDecision =
  | "VERIFIED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance verification artifact.
 */
export interface OSARProjectionAssuranceVerification {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceVerificationStatus;

  /**
   * Assurance ledger reference.
   */
  readonly assuranceLedgerReference:
    string;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Ordered verification lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Verification decision.
   */
  readonly decision:
    OSARProjectionAssuranceVerificationDecision;

  /**
   * Verification timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance verification artifact.
 *
 * Verification representation only.
 */
export function createOSARProjectionAssuranceVerification(input: {
  assuranceLedger:
    OSARProjectionAssuranceLedger;

  verificationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceVerification {

  const valid =
    validateOSARProjectionAssuranceLedger(
      input.assuranceLedger,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_VERIFICATION_RECORDED",

    assuranceLedgerReference:
      input.assuranceLedger.assuranceLedgerReference,

    verificationReference:
      input.verificationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceLedger.decision === "RECORDED" &&
      input.verificationReference.length > 0 &&
      input.lineage.length > 0
        ? "VERIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance verification structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceVerification(
  verification: OSARProjectionAssuranceVerification,
): boolean {

  return (
    verification.status ===
      "PROJECTION_ASSURANCE_VERIFICATION_RECORDED" &&
    verification.assuranceLedgerReference.length > 0 &&
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
