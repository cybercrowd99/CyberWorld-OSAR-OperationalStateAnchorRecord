/**
 * CyberWorld-OSAR — OSARProjectionAuthorization Artifact
 * 
 * OSARProjectionAuthorization defines the bounded authorization-
 * representation layer responsible for recording that projection
 * requirements have been structurally satisfied before NET handling.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - grant permissions
 * - authorize humans
 * - expand visibility
 * - modify OSAR artifacts
 * - modify world state
 *
 * Authorization representation only:
 * - preserves projection decision lineage
 * - preserves governance boundary
 * - records structural readiness
 * - supports controlled NET projection flow
 */

import {
  OSARProjectionDecision,
  validateOSARProjectionDecision,
} from "./osar-projection-decision";

export type OSARProjectionAuthorizationStatus =
  | "PROJECTION_AUTHORIZATION_RECORDED";

export type OSARProjectionAuthorizationDecision =
  | "AUTHORIZED"
  | "REVIEW"
  | "DENIED";

/**
 * Projection authorization artifact.
 */
export interface OSARProjectionAuthorization {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAuthorizationStatus;

  /**
   * Projection decision reference.
   */
  readonly decisionReference:
    string;

  /**
   * Authorization decision.
   */
  readonly decision:
    OSARProjectionAuthorizationDecision;

  /**
   * Authorization basis.
   */
  readonly basis:
    string;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection authorization artifact.
 *
 * Structural authorization representation only.
 */
export function createOSARProjectionAuthorization(input: {
  projectionDecision:
    OSARProjectionDecision;

  basis?: string;
}): OSARProjectionAuthorization {

  const valid =
    validateOSARProjectionDecision(
      input.projectionDecision,
    );

  return Object.freeze({
    status:
      "PROJECTION_AUTHORIZATION_RECORDED",

    decisionReference:
      input.projectionDecision.gateReference,

    decision:
      valid &&
      input.projectionDecision.outcome === "APPROVED"
        ? "AUTHORIZED"
        : "REVIEW",

    basis:
      input.basis ??
      (
        valid
          ? "PROJECTION_DECISION_VALIDATED"
          : "PROJECTION_DECISION_REQUIRES_REVIEW"
      ),

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection authorization structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAuthorization(
  authorization: OSARProjectionAuthorization,
): boolean {

  return (
    authorization.status ===
      "PROJECTION_AUTHORIZATION_RECORDED" &&
    authorization.decisionReference.length > 0 &&
    authorization.basis.length > 0 &&
    authorization.createdAt.length > 0 &&
    (
      authorization.decision === "AUTHORIZED" ||
      authorization.decision === "REVIEW" ||
      authorization.decision === "DENIED"
    )
  );
}
