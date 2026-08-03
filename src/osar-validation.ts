/**
 * CyberWorld-OSAR — OSARValidation Artifact
 *
 * OSARValidation defines the bounded validation layer
 * responsible for confirming structural integrity across
 * the complete OSAR operational chain.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - modify lifecycle
 * - modify world state
 *
 * Validation only:
 * - confirms structural integrity
 * - confirms artifact compatibility
 * - preserves containment guarantees
 * - preserves doctrine compliance
 */

import { OSARRecord } from "./osar-record";
import { OSARAnchor } from "./osar-anchor";
import { AuthorityRef } from "./authority-ref";
import { EvidenceRecord } from "./evidence-record";
import { CyberWorldState } from "./cyber-world-state";

export type OSARValidationStatus =
  | "VALIDATION_COMPLETED";

export type OSARValidationDecision =
  | "VALID"
  | "REVIEW"
  | "INVALID";

/**
 * Validation artifact.
 */
export interface OSARValidation {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARValidationStatus;

  /**
   * Validation decision.
   */
  readonly decision:
    OSARValidationDecision;

  /**
   * Record reference.
   */
  readonly recordReference:
    string;

  /**
   * Validation timestamp.
   */
  readonly validatedAt:
    string;
}

/**
 * Perform structural validation.
 *
 * Validation only.
 */
export function createOSARValidation(input: {
  record: OSARRecord;
  anchor: OSARAnchor;
  authority: AuthorityRef;
  state: CyberWorldState;
  evidence: readonly EvidenceRecord[];
}): OSARValidation {

  const decision: OSARValidationDecision =
    input.evidence.length > 0
      ? "VALID"
      : "REVIEW";

  return Object.freeze({
    status:
      "VALIDATION_COMPLETED",

    decision,

    recordReference:
      input.record.authorityReference,

    validatedAt:
      new Date().toISOString(),
  });
}

/**
 * Validate validation artifact.
 *
 * Structural validation only.
 */
export function validateOSARValidation(
  validation: OSARValidation,
): boolean {
  return (
    validation.status ===
      "VALIDATION_COMPLETED" &&
    validation.recordReference.length > 0 &&
    validation.validatedAt.length > 0 &&
    (
      validation.decision === "VALID" ||
      validation.decision === "REVIEW" ||
      validation.decision === "INVALID"
    )
  );
}
