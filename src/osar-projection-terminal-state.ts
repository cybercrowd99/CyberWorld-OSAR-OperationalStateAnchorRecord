/**
 * CyberWorld-OSAR — OSARProjectionTerminalState Artifact
 * 
 * OSARProjectionTerminalState defines the bounded terminal-state
 * representation layer responsible for recording the final preserved
 * condition of a completed projection closure path.
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
 * Terminal representation only:
 * - preserves closure lineage
 * - records final projection condition
 * - maintains immutable references
 * - supports historical verification
 */

import {
  OSARProjectionClosure,
  validateOSARProjectionClosure,
} from "./osar-projection-closure";

export type OSARProjectionTerminalStateStatus =
  | "PROJECTION_TERMINAL_RECORDED";

export type OSARProjectionTerminalStateDecision =
  | "TERMINATED"
  | "REVIEW"
  | "INVALID";

/**
 * Projection terminal state artifact.
 */
export interface OSARProjectionTerminalState {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARProjectionTerminalStateStatus;

  /**
   * Closure reference.
   */
  readonly closureReference:
    string;

  /**
   * Terminal state reference.
   */
  readonly terminalReference:
    string;

  /**
   * Terminal decision.
   */
  readonly decision:
    OSARProjectionTerminalStateDecision;

  /**
   * Terminal reason.
   */
  readonly terminalReason:
    string;

  /**
   * Terminal timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create projection terminal state artifact.
 *
 * Terminal representation only.
 */
export function createOSARProjectionTerminalState(input: {
  closure:
    OSARProjectionClosure;

  terminalReference:
    string;

  terminalReason:
    string;
}): OSARProjectionTerminalState {

  const valid =
    validateOSARProjectionClosure(
      input.closure,
    );

  return Object.freeze({
    status:
      "PROJECTION_TERMINAL_RECORDED",

    closureReference:
      input.closure.closureReference,

    terminalReference:
      input.terminalReference,

    decision:
      valid &&
      input.closure.decision === "CLOSED" &&
      input.terminalReference.length > 0
        ? "TERMINATED"
        : "REVIEW",

    terminalReason:
      input.terminalReason,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate projection terminal state structure.
 *
 * Structural validation only.
 */
export function validateOSARProjectionTerminalState(
  state: OSARProjectionTerminalState,
): boolean {

  return (
    state.status ===
      "PROJECTION_TERMINAL_RECORDED" &&
    state.closureReference.length > 0 &&
    state.terminalReference.length > 0 &&
    state.terminalReason.length > 0 &&
    state.createdAt.length > 0 &&
    (
      state.decision === "TERMINATED" ||
      state.decision === "REVIEW" ||
      state.decision === "INVALID"
    )
  );
}
