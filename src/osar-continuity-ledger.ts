/**
 * CyberWorld-OSAR — OSARContinuityLedger Artifact
 * 
 * OSARContinuityLedger defines the bounded continuity record
 * responsible for preserving artifact progression history.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - become a financial ledger
 * - authorize transactions
 * - modify operational state
 * - modify world state
 *
 * Continuity recording only:
 * - preserves artifact lineage
 * - preserves progression order
 * - preserves recovery history
 * - supports structural audit
 */

import {
  OSARArtifactRegistry,
  validateOSARArtifactRegistry,
} from "./osar-artifact-registry";

export type OSARContinuityLedgerStatus =
  | "CONTINUITY_REGISTERED";

export type OSARContinuityDecision =
  | "CONTINUOUS"
  | "REVIEW"
  | "BROKEN";

/**
 * Continuity ledger artifact.
 */
export interface OSARContinuityLedger {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARContinuityLedgerStatus;

  /**
   * Registry reference.
   */
  readonly registryReference:
    string;

  /**
   * Ordered continuity entries.
   */
  readonly lineage:
    readonly string[];

  /**
   * Continuity decision.
   */
  readonly decision:
    OSARContinuityDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create continuity ledger artifact.
 *
 * Continuity recording only.
 */
export function createOSARContinuityLedger(input: {
  registry:
    OSARArtifactRegistry;

  lineage:
    readonly string[];
}): OSARContinuityLedger {

  const decision: OSARContinuityDecision =
    validateOSARArtifactRegistry(input.registry)
      ? "CONTINUOUS"
      : "REVIEW";

  return Object.freeze({
    status:
      "CONTINUITY_REGISTERED",

    registryReference:
      input.registry.status,

    lineage:
      Object.freeze([
        ...input.lineage,
      ]),

    decision,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate continuity ledger structure.
 *
 * Structural validation only.
 */
export function validateOSARContinuityLedger(
  ledger: OSARContinuityLedger,
): boolean {

  return (
    ledger.status ===
      "CONTINUITY_REGISTERED" &&
    ledger.registryReference.length > 0 &&
    ledger.lineage.length > 0 &&
    ledger.createdAt.length > 0 &&
    (
      ledger.decision === "CONTINUOUS" ||
      ledger.decision === "REVIEW" ||
      ledger.decision === "BROKEN"
    )
  );
}
