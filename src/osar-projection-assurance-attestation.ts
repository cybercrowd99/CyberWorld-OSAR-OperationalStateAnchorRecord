/**
 * CyberWorld-OSAR — OSARProjectionAssuranceAttestation Artifact
 * 
 * OSARProjectionAssuranceAttestation defines the bounded attestation layer
 * responsible for recording that an assurance-verification checkpoint has
 * satisfied structural continuity requirements.
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
 * Attestation representation only:
 * - preserves verification lineage
 * - records attestation references
 * - maintains immutable checkpoints
 * - supports structural assurance continuity
 */

import {
  OSARProjectionAssuranceVerification,
  validateOSARProjectionAssuranceVerification,
} from "./osar-projection-assurance-verification";

export type OSARProjectionAssuranceAttestationStatus =
  | "PROJECTION_ASSURANCE_ATTESTATION_RECORDED";

export type OSARProjectionAssuranceAttestationDecision =
  | "ATTESTED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance attestation artifact.
 */
export interface OSARProjectionAssuranceAttestation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceAttestationStatus;

  /**
   * Verification reference.
   */
  readonly verificationReference:
    string;

  /**
   * Attestation reference.
   */
  readonly attestationReference:
    string;

  /**
   * Ordered attestation lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Attestation decision.
   */
  readonly decision:
    OSARProjectionAssuranceAttestationDecision;

  /**
   * Attestation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance attestation artifact.
 *
 * Attestation representation only.
 */
export function createOSARProjectionAssuranceAttestation(input: {
  assuranceVerification:
    OSARProjectionAssuranceVerification;

  attestationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceAttestation {

  const valid =
    validateOSARProjectionAssuranceVerification(
      input.assuranceVerification,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_ATTESTATION_RECORDED",

    verificationReference:
      input.assuranceVerification.verificationReference,

    attestationReference:
      input.attestationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceVerification.decision === "VERIFIED" &&
      input.attestationReference.length > 0 &&
      input.lineage.length > 0
        ? "ATTESTED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance attestation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceAttestation(
  attestation: OSARProjectionAssuranceAttestation,
): boolean {

  return (
    attestation.status ===
      "PROJECTION_ASSURANCE_ATTESTATION_RECORDED" &&
    attestation.verificationReference.length > 0 &&
    attestation.attestationReference.length > 0 &&
    attestation.lineage.length > 0 &&
    attestation.createdAt.length > 0 &&
    (
      attestation.decision === "ATTESTED" ||
      attestation.decision === "REVIEW" ||
      attestation.decision === "INVALID"
    )
  );
}
