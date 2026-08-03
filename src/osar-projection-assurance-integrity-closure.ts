/**
 * CyberWorld-OSAR — OSARProjectionAssuranceIntegrityClosure Artifact
 *
 * OSARProjectionAssuranceIntegrityClosure defines the bounded closure layer
 * responsible for recording the historical closure condition of a finalized
 * integrity checkpoint.
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
 * Closure representation only:
 * - preserves finalization lineage
 * - records closure references
 * - maintains immutable checkpoints
 * - supports structural integrity continuity
 */

import {
  OSARProjectionAssuranceIntegrityFinalization,
  validateOSARProjectionAssuranceIntegrityFinalization,
} from "./osar-projection-assurance-integrity-finalization";

export type OSARProjectionAssuranceIntegrityClosureStatus =
  "PROJECTION_ASSURANCE_INTEGRITY_CLOSURE_RECORDED";

export type OSARProjectionAssuranceIntegrityClosureDecision =
  | "CLOSED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance integrity closure artifact.
 */
export interface OSARProjectionAssuranceIntegrityClosure {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceIntegrityClosureStatus;

  /**
   * Finalization reference.
   */
  readonly finalizationReference:
    string;

  /**
   * Closure reference.
   */
  readonly closureReference:
    string;

  /**
   * Ordered closure lineage.
   */
  readonly lineage:
    readonly string[];

  /**
   * Closure decision.
   */
  readonly decision:
    OSARProjectionAssuranceIntegrityClosureDecision;

  /**
   * Closure timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance integrity closure artifact.
 *
 * Closure representation only.
 */
export function createOSARProjectionAssuranceIntegrityClosure(input: {
  integrityFinalization:
    OSARProjectionAssuranceIntegrityFinalization;

  closureReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceIntegrityClosure {

  const valid =
    validateOSARProjectionAssuranceIntegrityFinalization(
      input.integrityFinalization,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_INTEGRITY_CLOSURE_RECORDED",

    finalizationReference:
      input.integrityFinalization.finalizationReference,

    closureReference:
      input.closureReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.integrityFinalization.decision === "FINALIZED" &&
      input.closureReference.length > 0 &&
      input.lineage.length > 0
        ? "CLOSED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance integrity closure structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceIntegrityClosure(
  closure:
    OSARProjectionAssuranceIntegrityClosure,
): boolean {

  return (
    closure.status ===
      "PROJECTION_ASSURANCE_INTEGRITY_CLOSURE_RECORDED" &&
    closure.finalizationReference.length > 0 &&
    closure.closureReference.length > 0 &&
    closure.lineage.length > 0 &&
    closure.createdAt.length > 0 &&
    (
      closure.decision === "CLOSED" ||
      closure.decision === "REVIEW" ||
      closure.decision === "INVALID"
    )
  );
}
