/**
 * CyberWorld-OSAR — OSARProjectionRetention Artifact
 *
 * OSARProjectionRetention defines the bounded retention
 * representation layer responsible for preserving a terminal
 * projection condition for historical reference.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - authorize future actions
 * - expand visibility
 * - mutate OSAR artifacts
 * - modify world state
 *
 * Retention representation only:
 * - preserves terminal lineage
 * - records retained projection condition
 * - maintains immutable references
 * - supports historical verification continuity
 */

import {
  OSARProjectionTerminalState,
  validateOSARProjectionTerminalState,
} from "./osar-projection-terminal-state";

export type OSARProjectionRetentionStatus =
  | "PROJECTION_RETENTION_RECORDED";

export type OSARProjectionRetentionDecision =
  | "RETAINED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection retention artifact.
 */
export interface OSARProjectionRetention {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionRetentionStatus;

  /**
   * Terminal reference.
   */
  readonly terminalReference:
    string;

  /**
   * Retention reference.
   */
  readonly retentionReference:
    string;

  /**
   * Retention decision.
   */
  readonly decision:
    OSARProjectionRetentionDecision;

  /**
   * Retention reason.
   */
  readonly retentionReason:
    string;

  /**
   * Retention timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection retention artifact.
 *
 * Retention representation only.
 */
export function createOSARProjectionRetention(input: {
  terminal:
    OSARProjectionTerminalState;

  retentionReference:
    string;

  retentionReason:
    string;
}): OSARProjectionRetention {

  const valid =
    validateOSARProjectionTerminalState(
      input.terminal,
    );

  return Object.freeze({
    status:
      "PROJECTION_RETENTION_RECORDED",

    terminalReference:
      input.terminal.terminalReference,

    retentionReference:
      input.retentionReference,

    decision:
      valid &&
      input.terminal.decision === "TERMINATED" &&
      input.retentionReference.length > 0
        ? "RETAINED"
        : "REVIEW",

    retentionReason:
      input.retentionReason,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection retention structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionRetention(
  retention: OSARProjectionRetention,
): boolean {

  return (
    retention.status ===
      "PROJECTION_RETENTION_RECORDED" &&
    retention.terminalReference.length > 0 &&
    retention.retentionReference.length > 0 &&
    retention.retentionReason.length > 0 &&
    retention.createdAt.length > 0 &&
    (
      retention.decision === "RETAINED" ||
      retention.decision === "REVIEW" ||
      retention.decision === "INVALID"
    )
  );
}
