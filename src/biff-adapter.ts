/**
 * CyberWorld-OSAR — Biff Enforcement Projection Adapter
 * 
 * Biff Adapter defines the bounded enforcement projection layer
 * for approved NET surface representations.
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
 * Enforcement projection only:
 * - applies declared scope rules
 * - preserves anchor boundaries
 * - preserves lifecycle position
 * - preserves governance constraints
 */

import {
  NetSurfacePacket,
  validateNetSurfacePacket,
} from "./net-surface-packet";

export type BiffAdapterStatus =
  | "ENFORCEMENT_PROJECTED";

export type BiffEnforcementDecision =
  | "ENFORCED"
  | "REVIEW"
  | "REJECTED";

/**
 * Biff enforcement artifact.
 *
 * Represents declared enforcement projection only.
 */
export interface BiffEnforcementProjection {
  /**
   * Artifact discriminator.
   */
  readonly status:
    BiffAdapterStatus;

  /**
   * Enforcement decision.
   */
  readonly decision:
    BiffEnforcementDecision;

  /**
   * Source packet reference.
   */
  readonly packetReference:
    string;

  /**
   * Declared scope reference.
   */
  readonly scopeReference:
    string;

  /**
   * Projection timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create Biff enforcement projection.
 *
 * Enforcement mapping only.
 */
export function createBiffEnforcementProjection(
  packet: NetSurfacePacket,
): BiffEnforcementProjection {
  const decision: BiffEnforcementDecision =
    validateNetSurfacePacket(packet)
      ? "ENFORCED"
      : "REJECTED";

  return Object.freeze({
    status:
      "ENFORCEMENT_PROJECTED",
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
 * Validate Biff projection structure.
 *
 * Structural validation only.
 */
export function validateBiffEnforcementProjection(
  projection: BiffEnforcementProjection,
): boolean {
  return (
    projection.status ===
      "ENFORCEMENT_PROJECTED" &&
    projection.packetReference.length > 0 &&
    projection.scopeReference.length > 0 &&
    projection.createdAt.length > 0 &&
    (
      projection.decision === "ENFORCED" ||
      projection.decision === "REVIEW" ||
      projection.decision === "REJECTED"
    )
  );
}
