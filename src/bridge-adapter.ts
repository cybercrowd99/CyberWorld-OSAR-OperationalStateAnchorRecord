/**
 * CyberWorld-OSAR — Bridge Routing Projection Adapter
 *
 * Bridge Adapter defines the bounded routing projection layer
 * responsible for controlled movement between approved operational lanes.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - expand scope
 * - create permissions
 * - modify OSAR state
 * - modify CORE state
 *
 * Routing projection only:
 * - preserves approved movement paths
 * - preserves anchor reference
 * - preserves scope boundaries
 * - preserves lifecycle position
 */

import {
  NetSurfacePacket,
  validateNetSurfacePacket,
} from "./net-surface-packet";

export type BridgeAdapterStatus =
  | "ROUTING_PROJECTED";

export type BridgeRoutingDecision =
  | "ROUTED"
  | "REVIEW"
  | "REJECTED";

/**
 * Bridge routing artifact.
 */
export interface BridgeRoutingProjection {
  /**
   * Artifact discriminator.
   */
  readonly status:
    BridgeAdapterStatus;

  /**
   * Routing decision.
   */
  readonly decision:
    BridgeRoutingDecision;

  /**
   * Source packet reference.
   */
  readonly packetReference:
    string;

  /**
   * Origin lane.
   */
  readonly sourceLane:
    string;

  /**
   * Destination lane.
   */
  readonly destinationLane:
    string;

  /**
   * Projection timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create Bridge routing projection.
 *
 * Routing mapping only.
 */
export function createBridgeRoutingProjection(
  packet: NetSurfacePacket,
  destinationLane: string,
): BridgeRoutingProjection {
  const decision: BridgeRoutingDecision =
    validateNetSurfacePacket(packet) &&
    destinationLane.length > 0
      ? "ROUTED"
      : "REJECTED";

  return Object.freeze({
    status:
      "ROUTING_PROJECTED",
    decision,
    packetReference:
      packet.anchorReference,
    sourceLane:
      packet.capabilityLane,
    destinationLane,
    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate Bridge projection structure.
 *
 * Structural validation only.
 */
export function validateBridgeRoutingProjection(
  projection: BridgeRoutingProjection,
): boolean {
  return (
    projection.status ===
      "ROUTING_PROJECTED" &&
    projection.packetReference.length > 0 &&
    projection.sourceLane.length > 0 &&
    projection.destinationLane.length > 0 &&
    projection.createdAt.length > 0 &&
    (
      projection.decision === "ROUTED" ||
      projection.decision === "REVIEW" ||
      projection.decision === "REJECTED"
    )
  );
}
