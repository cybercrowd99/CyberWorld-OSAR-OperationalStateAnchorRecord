/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityAttestation Artifact
 *  
 * OSARProjectionAssuranceIntegrityAttestation defines the bounded attestation
 * layer responsible for recording that an integrity-verification checkpoint has
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
 * - supports structural integrity continuity
 */

import {
  OSARProjectionAssuranceIntegrityVerification,
  validateOSARProjectionAssuranceIntegrityVerification,
} from "./osar-projection-assurance-integrity-verification";

export type OSARProjectionAssuranceIntegrityAttestationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_ATTESTATION_RECORDED";

export type OSARProjectionAssuranceIntegrityAttestationDecision =
  | "ATTESTED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity attestation artifact.
 */
export interface OSARProjectionAssuranceIntegrityAttestation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityAttestationStatus;

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
    OSARProjectionAssuranceIntegrityAttestationDecision;

  /**
   * Attestation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity attestation artifact.
 *
 * Attestation representation only.
 */
export function createOSARProjectionAssuranceIntegrityAttestation(input: {
  integrityVerification:
    OSARProjectionAssuranceIntegrityVerification;

  attestationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityAttestation {

  const valid =
    validateOSARProjectionAssuranceIntegrityVerification(
      input.integrityVerification,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_ATTESTATION_RECORDED",

    verificationReference:
      input.integrityVerification.verificationReference,

    attestationReference:
      input.attestationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityVerification.decision === "VERIFIED" &&
      input.attestationReference.length > 0 &&
      input.lineage.length > 0
        ? "ATTESTED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity attestation structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityAttestation(
  attestation:
    OSARProjectionAssuranceIntegrityAttestation,
): boolean {

  return (
    attestation.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_ATTESTATION_RECORDED" &&
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
