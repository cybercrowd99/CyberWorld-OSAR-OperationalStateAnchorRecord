/**
 * CyberWorld-OSAR — OSARProjectionAssuranceClosure Artifact
 * 
 * OSARProjectionAssuranceClosure defines the bounded closure layer
 * responsible for recording the historical closure condition of a finalized
 * assurance checkpoint.
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
 * - supports structural assurance history
 */

import {
  OSARProjectionAssuranceFinalization,
  validateOSARProjectionAssuranceFinalization,
} from "./osar-projection-assurance-finalization";

export type OSARProjectionAssuranceClosureStatus =
  | "PROJECTION_ASSURANCE_CLOSURE_RECORDED";

export type OSARProjectionAssuranceClosureDecision =
  | "CLOSED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection assurance closure artifact.
 */
export interface OSARProjectionAssuranceClosure {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionAssuranceClosureStatus;

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
    OSARProjectionAssuranceClosureDecision;

  /**
   * Closure timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection assurance closure artifact.
 *
 * Closure representation only.
 */
export function createOSARProjectionAssuranceClosure(input: {
  assuranceFinalization:
    OSARProjectionAssuranceFinalization;

  closureReference:
    string;

  lineage:
    readonly string[];
}): OSARProjectionAssuranceClosure {

  const valid =
    validateOSARProjectionAssuranceFinalization(
      input.assuranceFinalization,
    );

  return Object.freeze({
    status:
      "PROJECTION_ASSURANCE_CLOSURE_RECORDED",

    finalizationReference:
      input.assuranceFinalization.finalizationReference,

    closureReference:
      input.closureReference,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision:
      valid &&
      input.assuranceFinalization.decision === "FINALIZED" &&
      input.closureReference.length > 0 &&
      input.lineage.length > 0
        ? "CLOSED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection assurance closure structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionAssuranceClosure(
  closure: OSARProjectionAssuranceClosure,
): boolean {

  return (
    closure.status ===
      "PROJECTION_ASSURANCE_CLOSURE_RECORDED" &&
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
