/**
 * CyberWorld-OSAR — Dewey Visibility Projection Adapter
 *
 * Dewey Adapter defines the bounded visibility projection layer
 * for approved NET surface representations.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - judge conditions
 * - modify OSAR state
 * - expand visibility scope
 *
 * Visibility projection only:
 * - determines represented visibility surface
 * - preserves scope boundaries
 * - preserves lifecycle state
 * - exposes approved operational representation
 */

import {
  NetSurfacePacket,
  validateNetSurfacePacket,
} from "./net-surface-packet";

export type DeweyAdapterStatus =
  | "VISIBILITY_PROJECTED";

export type DeweyVisibilityDecision =
  | "VISIBLE"
  | "REVIEW"
  | "REJECTED";

/**
 * Dewey visibility artifact.
 */
export interface DeweyVisibilityProjection {
  readonly status:
    DeweyAdapterStatus;

  readonly decision:
    DeweyVisibilityDecision;

  readonly packetReference:
    string;

  readonly scopeReference:
    string;

  readonly createdAt:
    string;
}

/**
 * Create Dewey visibility projection.
 *
 * Visibility mapping only.
 */
export function createDeweyVisibilityProjection(
  packet: NetSurfacePacket,
): DeweyVisibilityProjection {
  const decision: DeweyVisibilityDecision =
    validateNetSurfacePacket(packet)
      ? "VISIBLE"
      : "REJECTED";

  return Object.freeze({
    status:
      "VISIBILITY_PROJECTED",
    decision,
    packetReference:
      packet.anchorReference,
    scopeReference:
      packet.scopeReference,
    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate Dewey projection structure.
 *
 * Structural validation only.
 */
export function validateDeweyVisibilityProjection(
  projection: DeweyVisibilityProjection,
): boolean {
  return (
    projection.status ===
      "VISIBILITY_PROJECTED" &&
    projection.packetReference.length > 0 &&
    projection.scopeReference.length > 0 &&
    projection.createdAt.length > 0 &&
    (
      projection.decision === "VISIBLE" ||
      projection.decision === "REVIEW" ||
      projection.decision === "REJECTED"
    )
  );
}
