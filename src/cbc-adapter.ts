/**
 * CyberWorld-OSAR — CBC Governance Projection Adapter
 * 
 * CBC Adapter defines the bounded governance projection layer
 * responsible for validating OSAR boundary compliance before
 * operational surface exposure.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create permissions
 * - modify OSAR state
 * - modify CORE state
 * - expand governance scope
 *
 * Governance projection only:
 * - validates declared boundaries
 * - preserves invariant compliance
 * - preserves lifecycle constraints
 * - protects identity separation
 */

import {
  NetSurfacePacket,
  validateNetSurfacePacket,
} from "./net-surface-packet";

export type CBCAdapterStatus =
  | "GOVERNANCE_VALIDATED";

export type CBCGovernanceDecision =
  | "APPROVED"
  | "REVIEW"
  | "REJECTED";

/**
 * CBC governance artifact.
 */
export interface CBCGovernanceProjection {
  /**
   * Artifact discriminator.
   */
  readonly status:
    CBCAdapterStatus;

  /**
   * Governance decision.
   */
  readonly decision:
    CBCGovernanceDecision;

  /**
   * Source packet reference.
   */
  readonly packetReference:
    string;

  /**
   * Governance scope reference.
   */
  readonly governanceReference:
    string;

  /**
   * Validation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create CBC governance projection.
 *
 * Boundary validation only.
 */
export function createCBCGovernanceProjection(
  packet: NetSurfacePacket,
  governanceReference: string,
): CBCGovernanceProjection {
  const decision: CBCGovernanceDecision =
    validateNetSurfacePacket(packet) &&
    governanceReference.length > 0
      ? "APPROVED"
      : "REJECTED";

  return Object.freeze({
    status:
      "GOVERNANCE_VALIDATED",
    decision,
    packetReference:
      packet.anchorReference,
    governanceReference,
    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate CBC projection structure.
 *
 * Structural validation only.
 */
export function validateCBCGovernanceProjection(
  projection: CBCGovernanceProjection,
): boolean {
  return (
    projection.status ===
      "GOVERNANCE_VALIDATED" &&
    projection.packetReference.length > 0 &&
    projection.governanceReference.length > 0 &&
    projection.createdAt.length > 0 &&
    (
      projection.decision === "APPROVED" ||
      projection.decision === "REVIEW" ||
      projection.decision === "REJECTED"
    )
  );
}
