/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityDissolutionDecision
 * 
 * Bounded dissolution decision representation layer.
 *
 * This artifact records the structural decision state following a
 * dissolution request evaluation.
 *
 * It does not:
 * - execute deletion
 * - shred keys
 * - control vault systems
 * - control Biff lanes
 * - control Dewey surfaces
 * - mutate OSAR artifacts
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 *
 * Decision representation only:
 * - evaluates dissolution request structure
 * - records lifecycle decision state
 * - preserves minimal references
 * - supports temporal boundary review
 * - maintains immutable decision checkpoints
 */

import {
  OSARProjectionAssuranceIntegrityDissolutionRequest,
  validateOSARProjectionAssuranceIntegrityDissolutionRequest,
} from "./osar-projection-assurance-integrity-dissolution-request";


export type OSARProjectionAssuranceIntegrityDissolutionDecisionStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_DECISION_RECORDED";


export type OSARProjectionAssuranceIntegrityDissolutionDecisionOutcome =
  | "APPROVED"
  | "REVIEW";


export interface OSARProjectionAssuranceIntegrityDissolutionDecision {

  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityDissolutionDecisionStatus;


  /**
   * Source dissolution request reference.
   */
  readonly dissolutionRequestReference:
    string;


  /**
   * Immutable decision anchor.
   */
  readonly decisionReference:
    string;


  /**
   * Ordered lifecycle lineage.
   */
  readonly lineage:
    readonly string[];


  /**
   * Decision outcome.
   */
  readonly outcome:
    OSARProjectionAssuranceIntegrityDissolutionDecisionOutcome;


  /**
   * Decision timestamp.
   */
  readonly createdAt:
    string;
}


/**
 * Create dissolution decision representation.
 *
 * Pure structural decision only.
 */
export function createOSARProjectionAssuranceIntegrityDissolutionDecision(
  input: {
    dissolutionRequest:
      OSARProjectionAssuranceIntegrityDissolutionRequest;

    lineage:
      readonly string[];
  },
): OSARProjectionAssuranceIntegrityDissolutionDecision {

  const validRequest =
    validateOSARProjectionAssuranceIntegrityDissolutionRequest(
      input.dissolutionRequest,
    );

  const valid =
    validRequest &&
    input.dissolutionRequest.decision === "ELIGIBLE" &&
    input.lineage.length > 0;


  return Object.freeze({

    status:
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_DECISION_RECORDED",

    dissolutionRequestReference:
      input.dissolutionRequest.dissolutionReference,

    decisionReference:
      `DISSOLUTION-DECISION-${Date.now()}`,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    outcome:
      valid
        ? "APPROVED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}


/**
 * Validate dissolution decision structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityDissolutionDecision(
  decision:
    OSARProjectionAssuranceIntegrityDissolutionDecision,
): boolean {

  return (

    decision.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_DISSOLUTION_DECISION_RECORDED"

    && decision.dissolutionRequestReference.length > 0

    && decision.decisionReference.length > 0

    && decision.lineage.length > 0

    && (
      decision.outcome === "APPROVED" ||
      decision.outcome === "REVIEW"
    )

    && decision.createdAt.length > 0
  );
}
