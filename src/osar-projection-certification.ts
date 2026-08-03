/**
 * CyberWorld-OSAR — OSARProjectionCertification Artifact
 *
 * OSARProjectionCertification defines the bounded certification
 * representation layer responsible for recording that a projection
 * verification ledger has satisfied structural continuity requirements.
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
 * Certification representation only:
 * - preserves verification lineage
 * - records certification references
 * - maintains immutable checkpoints
 * - supports structural assurance history
 */

import {
  OSARProjectionVerificationLedger,
  validateOSARProjectionVerificationLedger,
} from "./osar-projection-verification-ledger";

export type OSARProjectionCertificationStatus =
  | "PROJECTION_CERTIFICATION_RECORDED";

export type OSARProjectionCertificationDecision =
  | "CERTIFIED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection certification artifact.
 */
export interface OSARProjectionCertification {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionCertificationStatus;

  /**
   * Verification ledger reference.
   */
  readonly verificationLedgerReference:
    string;

  /**
   * Certification reference.
   */
  readonly certificationReference:
    string;

  /**
   * Ordered certification lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Certification decision.
   */
  readonly decision:
    OSARProjectionCertificationDecision;

  /**
   * Certification timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection certification artifact.
 *
 * Certification representation only.
 */
export function createOSARProjectionCertification(input: {
  verificationLedger:
    OSARProjectionVerificationLedger;

  certificationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionCertification {

  const valid =
    validateOSARProjectionVerificationLedger(
      input.verificationLedger,
    );

  return Object.freeze({
    status:
      "PROJECTION_CERTIFICATION_RECORDED",

    verificationLedgerReference:
      input.verificationLedger.verificationLedgerReference,

    certificationReference:
      input.certificationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.verificationLedger.decision === "VERIFIED" &&
      input.certificationReference.length > 0 &&
      input.lineage.length > 0
        ? "CERTIFIED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection certification structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionCertification(
  certification: OSARProjectionCertification,
): boolean {

  return (
    certification.status ===
      "PROJECTION_CERTIFICATION_RECORDED" &&
    certification.verificationLedgerReference.length > 0 &&
    certification.certificationReference.length > 0 &&
    certification.lineage.length > 0 &&
    certification.createdAt.length > 0 &&
    (
      certification.decision === "CERTIFIED" ||
      certification.decision === "REVIEW" ||
      certification.decision === "INVALID"
    )
  );
}
