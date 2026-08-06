/**
 * CyberWorld-OSAR — OSARProjectionAttestation Artifact
 * 
 * OSARProjectionAttestation defines the bounded attestation
 * representation layer responsible for recording that a sealed
 * projection checkpoint has satisfied structural continuity.
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
 * Attestation representation only:
 * - preserves seal lineage
 * - records checkpoint confirmation
 * - maintains immutable references
 * - supports structural audit continuity
 */

import {
  OSARProjectionSeal,
  validateOSARProjectionSeal,
} from "./osar-projection-seal";

export type OSARProjectionAttestationStatus =
  | "PROJECTION_ATTESTATION_RECORDED";

export type OSARProjectionAttestationDecision =
  | "ATTESTED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection attestation artifact.
 */
export interface OSARProjectionAttestation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAttestationStatus;

  /**
   * Seal reference.
   */
  readonly sealReference:
    string;

  /**
   * Attestation reference.
   */
  readonly attestationReference:
    string;

  /**
   * Attestation decision.
   */
  readonly decision:
    OSARProjectionAttestationDecision;

  /**
   * Attestation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection attestation artifact.
 *
 * Attestation representation only.
 */
export function createOSARProjectionAttestation(input: {
  seal:
    OSARProjectionSeal;

  attestationReference:
    string;
}): OSARProjectionAttestation {

  const valid =
    validateOSARProjectionSeal(
      input.seal,
    );

  return Object.freeze({
    status:
      "PROJECTION_ATTESTATION_RECORDED",

    sealReference:
      input.seal.sealReference,

    attestationReference:
      input.attestationReference,

    decision:
      valid &&
      input.seal.decision === "SEALED" &&
      input.attestationReference.length > 0
        ? "ATTESTED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection attestation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAttestation(
  attestation: OSARProjectionAttestation,
): boolean {

  return (
    attestation.status ===
      "PROJECTION_ATTESTATION_RECORDED" &&
    attestation.sealReference.length > 0 &&
    attestation.attestationReference.length > 0 &&
    attestation.createdAt.length > 0 &&
    (
      attestation.decision === "ATTESTED" ||
      attestation.decision === "REVIEW" ||
      attestation.decision === "INVALID"
    )
  );
}
