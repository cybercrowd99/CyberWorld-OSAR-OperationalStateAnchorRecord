/**
 * CyberWorld-OSAR — OSARRecovery Artifact
 * 
 * OSARRecovery defines the bounded recovery layer responsible for
 * coordinating structural recovery after validation or projection
 * failures while preserving OSAR continuity.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - recreate anchors
 * - bypass lifecycle rules
 * - modify world state
 *
 * Recovery only:
 * - preserves continuity
 * - preserves anchor lineage
 * - preserves validation history
 * - coordinates controlled recovery
 */

import { OSARValidation } from "./osar-validation";

export type OSARRecoveryStatus =
  | "RECOVERY_REGISTERED";

export type OSARRecoveryDecision =
  | "RECOVERED"
  | "REPROJECT"
  | "MANUAL_REVIEW"
  | "FAILED";

/**
 * Recovery artifact.
 */
export interface OSARRecovery {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARRecoveryStatus;

  /**
   * Recovery decision.
   */
  readonly decision:
    OSARRecoveryDecision;

  /**
   * Validation reference.
   */
  readonly validationReference:
    string;

  /**
   * Recovery reason.
   */
  readonly reason:
    string;

  /**
   * Recovery timestamp.
   */
  readonly recoveredAt:
    string;
}

/**
 * Create recovery artifact.
 *
 * Recovery coordination only.
 */
export function createOSARRecovery(input: {
  validation: OSARValidation;
  decision: OSARRecoveryDecision;
  reason: string;
}): OSARRecovery {

  return Object.freeze({
    status:
      "RECOVERY_REGISTERED",

    decision:
      input.decision,

    validationReference:
      input.validation.recordReference,

    reason:
      input.reason,

    recoveredAt:
      new Date().toISOString(),
  });
}

/**
 * Validate recovery artifact.
 *
 * Structural validation only.
 */
export function validateOSARRecovery(
  recovery: OSARRecovery,
): boolean {

  return (
    recovery.status ===
      "RECOVERY_REGISTERED" &&
    recovery.validationReference.length > 0 &&
    recovery.reason.length > 0 &&
    recovery.recoveredAt.length > 0 &&
    (
      recovery.decision === "RECOVERED" ||
      recovery.decision === "REPROJECT" ||
      recovery.decision === "MANUAL_REVIEW" ||
      recovery.decision === "FAILED"
    )
  );
}
