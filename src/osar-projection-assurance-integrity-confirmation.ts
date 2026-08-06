/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityConfirmation Artifact
 * 
 * OSARProjectionAssuranceIntegrityConfirmation defines the bounded
 * integrity-confirmation layer responsible for recording that a preserved
 * integrity-continuity chain has satisfied structural integrity requirements.
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
 * Integrity-confirmation representation only:
 * - preserves preservation lineage
 * - records integrity-confirmation references
 * - maintains immutable checkpoints
 * - supports structural integrity verification review
 */

import {
  OSARProjectionAssuranceIntegrityPreservation,
  validateOSARProjectionAssuranceIntegrityPreservation,
} from "./osar-projection-assurance-integrity-preservation";

export type OSARProjectionAssuranceIntegrityConfirmationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_RECORDED";

export type OSARProjectionAssuranceIntegrityConfirmationDecision =
  | "CONFIRMED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity-confirmation artifact.
 */
export interface OSARProjectionAssuranceIntegrityConfirmation {

  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityConfirmationStatus;

  /**
   * Preservation reference.
   */
  readonly preservationReference:
    string;

  /**
   * Integrity-confirmation reference.
   */
  readonly confirmationReference:
    string;

  /**
   * Ordered integrity-confirmation lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Integrity-confirmation decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityConfirmationDecision;

  /**
   * Confirmation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity-confirmation artifact.
 *
 * Integrity-confirmation representation only.
 */
export function createOSARProjectionAssuranceIntegrityConfirmation(input: {
  assurancePreservation:
    OSARProjectionAssuranceIntegrityPreservation;

  confirmationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityConfirmation {

  const valid =
    validateOSARProjectionAssuranceIntegrityPreservation(
      input.assurancePreservation,
    );

  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_RECORDED",

    preservationReference:
      input.assurancePreservation.preservationReference,

    confirmationReference:
      input.confirmationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assurancePreservation.decision === "PRESERVED" &&
      input.confirmationReference.length > 0 &&
      input.lineage.length > 0
        ? "CONFIRMED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity-confirmation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityConfirmation(
  confirmation:
    OSARProjectionAssuranceIntegrityConfirmation,
): boolean {

  return (
    confirmation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CONFIRMATION_RECORDED" &&

    confirmation.preservationReference.length > 0 &&

    confirmation.confirmationReference.length > 0 &&

    confirmation.lineage.length > 0 &&

    confirmation.createdAt.length > 0 &&

    (
      confirmation.decision === "CONFIRMED" ||
      confirmation.decision === "REVIEW" ||
      confirmation.decision === "INVALID"
    )
  );
}
