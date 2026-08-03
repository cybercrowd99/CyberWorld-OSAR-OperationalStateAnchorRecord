/**
 * CyberWorld-OSAR — InvariantIndex Artifact
 *
 * InvariantIndex defines the bounded registry of OSAR
 * constitutional invariants required for structural validation.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - enforce permissions
 * - modify world state
 *
 * Invariant indexing only:
 * - identifies active invariants
 * - preserves validation ordering
 * - supports structural verification
 * - maintains doctrine references
 */

import {
  validateNoBleedLaw,
  NoBleedLawArtifact,
} from "./no-bleed-law";

import {
  validateClockLaw,
  ClockLawArtifact,
} from "./clock-law";

import {
  validateLabelLaw,
  LabelLawArtifact,
} from "./label-law";

import {
  validateTwoKeyLaw,
  TwoKeyLawArtifact,
} from "./two-key-law";

export type InvariantIndexStatus =
  | "INVARIANT_INDEX_REGISTERED";

export type InvariantValidationDecision =
  | "VALID"
  | "REVIEW"
  | "INVALID";

/**
 * Invariant index artifact.
 */
export interface InvariantIndex {
  /**
   * Artifact discriminator.
   */
  readonly status:
    InvariantIndexStatus;

  /**
   * Registered invariant references.
   */
  readonly invariants:
    readonly string[];

  /**
   * Overall validation decision.
   */
  readonly decision:
    InvariantValidationDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create invariant index.
 *
 * Registration only.
 */
export function createInvariantIndex(input: {
  noBleedLaw: NoBleedLawArtifact;
  clockLaw: ClockLawArtifact;
  labelLaw: LabelLawArtifact;
  twoKeyLaw: TwoKeyLawArtifact;
}): InvariantIndex {

  const valid =
    validateNoBleedLaw(input.noBleedLaw) &&
    validateClockLaw(input.clockLaw) &&
    validateLabelLaw(input.labelLaw) &&
    validateTwoKeyLaw(input.twoKeyLaw);

  return Object.freeze({
    status:
      "INVARIANT_INDEX_REGISTERED",

    invariants:
      Object.freeze([
        "NO_BLEED_LAW",
        "CLOCK_LAW",
        "LABEL_LAW",
        "TWO_KEY_LAW",
      ]),

    decision:
      valid
        ? "VALID"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate invariant index.
 *
 * Structural validation only.
 */
export function validateInvariantIndex(
  index: InvariantIndex,
): boolean {

  return (
    index.status ===
      "INVARIANT_INDEX_REGISTERED" &&
    index.invariants.length > 0 &&
    index.createdAt.length > 0 &&
    (
      index.decision === "VALID" ||
      index.decision === "REVIEW" ||
      index.decision === "INVALID"
    )
  );
}
