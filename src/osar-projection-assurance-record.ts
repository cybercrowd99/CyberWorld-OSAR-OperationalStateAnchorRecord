/**
 * CyberWorld-OSAR — OSARProjectionAssuranceRecord Artifact
 * 
 * OSARProjectionAssuranceRecord defines the bounded assurance-recording layer
 * responsible for preserving certification continuity after a projection
 * certification checkpoint.
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
 * Assurance recording only:
 * - preserves certification lineage
 * - records assurance references
 * - maintains immutable checkpoint history
 * - supports structural assurance review
 */

import {
  OSARProjectionCertification,
  validateOSARProjectionCertification,
} from "./osar-projection-certification";

export type OSARProjectionAssuranceRecordStatus =
  | "PROJECTION_ASSURANCE_RECORDED";

export type OSARProjectionAssuranceDecision =
  | "ASSURED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance record artifact.
 */
export interface OSARProjectionAssuranceRecord {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceRecordStatus;

  /**
   * Certification reference.
   */
  readonly certificationReference:
    string;

  /**
   * Assurance record reference.
   */
  readonly assuranceReference:
    string;

  /**
   * Ordered assurance lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Assurance decision.
   */
  readonly decision:
    OSARProjectionAssuranceDecision;

  /**
   * Assurance timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance record artifact.
 *
 * Assurance representation only.
 */
export function createOSARProjectionAssuranceRecord(input: {
  certification:
    OSARProjectionCertification;

  assuranceReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceRecord {

  const valid =
    validateOSARProjectionCertification(
      input.certification,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_RECORDED",

    certificationReference:
      input.certification.certificationReference,

    assuranceReference:
      input.assuranceReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.certification.decision === "CERTIFIED" &&
      input.assuranceReference.length > 0 &&
      input.lineage.length > 0
        ? "ASSURED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance record structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceRecord(
  record: OSARProjectionAssuranceRecord,
): boolean {

  return (
    record.status ===
      "PROJECTION_ASSURANCE_RECORDED" &&
    record.certificationReference.length > 0 &&
    record.assuranceReference.length > 0 &&
    record.lineage.length > 0 &&
    record.createdAt.length > 0 &&
    (
      record.decision === "ASSURED" ||
      record.decision === "REVIEW" ||
      record.decision === "INVALID"
    )
  );
}
