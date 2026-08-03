/**
 * CyberWorld-OSAR — NetSurfacePacket Projection Artifact
 *
 * NetSurfacePacket defines the bounded NET projection representation
 * of an approved OSAR operational condition.
 *
 * It does not:
 * - redefine OSAR meaning
 * - create authority
 * - create identity
 * - create ownership
 * - modify CORE state
 * - control world state
 *
 * Projection only:
 * - carries approved representation
 * - preserves anchor reference
 * - preserves scope
 * - preserves lifecycle
 * - preserves governance boundaries
 */

export type NetSurfacePacketStatus =
  | "SURFACE_PROJECTED";

export interface NetSurfacePacket {
  /**
   * Artifact discriminator.
   */
  readonly status:
    NetSurfacePacketStatus;

  /**
   * Anchor reference.
   */
  readonly anchorReference:
    string;

  /**
   * Capability lane.
   */
  readonly capabilityLane:
    string;

  /**
   * Represented operational state.
   */
  readonly stateReference:
    string;

  /**
   * Declaring authority reference.
   */
  readonly authorityReference:
    string;

  /**
   * Scope boundary.
   */
  readonly scopeReference:
    string;

  /**
   * Lifecycle position.
   */
  readonly lifecycle:
    string;

  /**
   * Projection timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create NET surface projection packet.
 *
 * Projection only.
 */
export function createNetSurfacePacket(input: {
  anchorReference: string;
  capabilityLane: string;
  stateReference: string;
  authorityReference: string;
  scopeReference: string;
  lifecycle: string;
  createdAt?: string;
}): NetSurfacePacket {
  return Object.freeze({
    status:
      "SURFACE_PROJECTED",
    anchorReference:
      input.anchorReference,
    capabilityLane:
      input.capabilityLane,
    stateReference:
      input.stateReference,
    authorityReference:
      input.authorityReference,
    scopeReference:
      input.scopeReference,
    lifecycle:
      input.lifecycle,
    createdAt:
      input.createdAt ??
      new Date().toISOString(),
  });
}

/**
 * Validate NET projection packet.
 *
 * Structural validation only.
 */
export function validateNetSurfacePacket(
  packet: NetSurfacePacket,
): boolean {
  return (
    packet.status === "SURFACE_PROJECTED" &&
    packet.anchorReference.length > 0 &&
    packet.capabilityLane.length > 0 &&
    packet.stateReference.length > 0 &&
    packet.authorityReference.length > 0 &&
    packet.scopeReference.length > 0 &&
    packet.lifecycle.length > 0 &&
    packet.createdAt.length > 0
  );
}
