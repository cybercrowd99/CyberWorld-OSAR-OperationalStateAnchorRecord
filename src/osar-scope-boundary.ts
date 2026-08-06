/**
 * CyberWorld-OSAR — OSARScopeBoundary Artifact
 * 
 * OSARScopeBoundary defines the bounded scope container
 * responsible for declaring where an operational condition
 * is allowed to exist.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - expand permissions
 * - modify operational state
 * - modify world state
 * - override No-Bleed Law
 *
 * Scope representation only:
 * - preserves declared boundaries
 * - supports containment validation
 * - maintains isolation references
 * - prevents uncontrolled propagation
 */

export type OSARScopeBoundaryStatus =
  | "SCOPE_REGISTERED";

export type OSARScopeDecision =
  | "CONTAINED"
  | "REVIEW"
  | "VIOLATION";

/**
 * Scope boundary artifact.
 */
export interface OSARScopeBoundary {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARScopeBoundaryStatus;

  /**
   * Scope reference.
   */
  readonly scopeReference:
    string;

  /**
   * Declared operational lane.
   */
  readonly operationalLane:
    string;

  /**
   * Allowed containment target.
   */
  readonly containmentTarget:
    string;

  /**
   * Scope decision.
   */
  readonly decision:
    OSARScopeDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create scope boundary artifact.
 *
 * Containment representation only.
 */
export function createOSARScopeBoundary(input: {
  scopeReference:
    string;

  operationalLane:
    string;

  containmentTarget:
    string;
}): OSARScopeBoundary {

  return Object.freeze({
    status:
      "SCOPE_REGISTERED",

    scopeReference:
      input.scopeReference,

    operationalLane:
      input.operationalLane,

    containmentTarget:
      input.containmentTarget,

    decision:
      input.scopeReference.length > 0 &&
      input.operationalLane.length > 0 &&
      input.containmentTarget.length > 0
        ? "CONTAINED"
        : "REVIEW",

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate scope boundary structure.
 *
 * Structural validation only.
 */
export function validateOSARScopeBoundary(
  boundary: OSARScopeBoundary,
): boolean {

  return (
    boundary.status ===
      "SCOPE_REGISTERED" &&
    boundary.scopeReference.length > 0 &&
    boundary.operationalLane.length > 0 &&
    boundary.containmentTarget.length > 0 &&
    boundary.createdAt.length > 0 &&
    (
      boundary.decision === "CONTAINED" ||
      boundary.decision === "REVIEW" ||
      boundary.decision === "VIOLATION"
    )
  );
}
