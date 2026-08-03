/**
 * CyberWorld-OSAR — OSARProjectionFinalization Artifact
 *
 * OSARProjectionFinalization defines the bounded finalization
 * representation layer responsible for recording completion of
 * a structurally attested projection checkpoint.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 *
 * Finalization representation only:
 * - preserves attestation lineage
 * - records final checkpoint condition
 * - maintains immutable references
 * - supports closure verification
 */

import {
  OSARProjectionAttestation,
  validateOSARProjectionAttestation,
} from "./osar-projection-attestation";

export type OSARProjectionFinalizationStatus =
  | "PROJECTION_FINALIZATION_RECORDED";

export type OSARProjectionFinalizationDecision =
  | "FINALIZED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection finalization artifact.
 */
export interface OSARProjectionFinalization {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionFinalizationStatus;

  /**
   * Attestation reference.
   */
  readonly attestationReference:
    string;

  /**
   * Finalization reference.
   */
  readonly finalizationReference:
    string;

  /**
   * Finalization decision.
   */
  readonly decision:
    OSARProjectionFinalizationDecision;

  /**
   * Finalization timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection finalization artifact.
 *
 * Finalization representation only.
 */
export function createOSARProjectionFinalization(input: {
  attestation:
    OSARProjectionAttestation;

  finalizationReference:
    string;
}): OSARProjectionFinalization {

  const valid =
    validateOSARProjectionAttestation(
      input.attestation,
    );

  return Object.freeze({
    status:
      "PROJECTION_FINALIZATION_RECORDED",

    attestationReference:
      input.attestation.attestationReference,

    finalizationReference:
      input.finalizationReference,

    decision:
      valid &&
      input.attestation.decision === "ATTESTED" &&
      input.finalizationReference.length > 0
        ? "FINALIZED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection finalization structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionFinalization(
  finalization: OSARProjectionFinalization,
): boolean {

  return (
    finalization.status ===
      "PROJECTION_FINALIZATION_RECORDED" &&
    finalization.attestationReference.length > 0 &&
    finalization.finalizationReference.length > 0 &&
    finalization.createdAt.length > 0 &&
    (
      finalization.decision === "FINALIZED" ||
      finalization.decision === "REVIEW" ||
      finalization.decision === "INVALID"
    )
  );
}
