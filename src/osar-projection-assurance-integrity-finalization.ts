/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityFinalization Artifact
 *
 * OSARProjectionAssuranceIntegrityFinalization defines the bounded finalization
 * layer responsible for recording closure of an attested integrity checkpoint.
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
 * Finalization representation only:
 * - preserves attestation lineage
 * - records finalization references
 * - maintains immutable checkpoints
 * - supports structural integrity closure
 */

import {
  OSARProjectionAssuranceIntegrityAttestation,
  validateOSARProjectionAssuranceIntegrityAttestation,
} from "./osar-projection-assurance-integrity-attestation";

export type OSARProjectionAssuranceIntegrityFinalizationStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_FINALIZATION_RECORDED";

export type OSARProjectionAssuranceIntegrityFinalizationDecision =
  | "FINALIZED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity finalization artifact.
 */
export interface OSARProjectionAssuranceIntegrityFinalization {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityFinalizationStatus;

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
   * Ordered finalization lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Finalization decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityFinalizationDecision;

  /**
   * Finalization timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity finalization artifact.
 *
 * Finalization representation only.
 */
export function createOSARProjectionAssuranceIntegrityFinalization(input: {
  integrityAttestation:
    OSARProjectionAssuranceIntegrityAttestation;

  finalizationReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityFinalization {

  const valid =
    validateOSARProjectionAssuranceIntegrityAttestation(
      input.integrityAttestation,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_FINALIZATION_RECORDED",

    attestationReference:
      input.integrityAttestation.attestationReference,

    finalizationReference:
      input.finalizationReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityAttestation.decision === "ATTESTED" &&
      input.finalizationReference.length > 0 &&
      input.lineage.length > 0
        ? "FINALIZED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity finalization structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityFinalization(
  finalization:
    OSARProjectionAssuranceIntegrityFinalization,
): boolean {

  return (
    finalization.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_FINALIZATION_RECORDED" &&
    finalization.attestationReference.length > 0 &&
    finalization.finalizationReference.length > 0 &&
    finalization.lineage.length > 0 &&
    finalization.createdAt.length > 0 &&
    (
      finalization.decision === "FINALIZED" ||
      finalization.decision === "REVIEW" ||
      finalization.decision === "INVALID"
    )
  );
}
