/**
 * CyberWorld-OSAR — OSARCoreBinding Translation Artifact
 *
 * OSARCoreBinding defines the bounded translation layer
 * between OSAR representation and CORE interpretation.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - modify world state
 * - bypass OSAR invariants
 *
 * CORE translation only:
 * - carries represented condition
 * - preserves authority reference
 * - preserves evidence lineage
 * - preserves scope boundaries
 * - preserves lifecycle position
 */

import { OSARRecord } from "./osar-record";
import { validateAuthorityRef } from "./authority-ref";
import { validateNoBleedLaw } from "./no-bleed-law";
import { validateClockLaw } from "./clock-law";
import { validateLabelLaw } from "./label-law";
import { validateTwoKeyLaw } from "./two-key-law";

export type OSARCoreBindingStatus =
  | "CORE_BOUND";

export type OSARCoreBindingDecision =
  | "VALID"
  | "REVIEW"
  | "REJECTED";

/**
 * CORE binding artifact.
 *
 * Represents translation readiness only.
 */
export interface OSARCoreBinding {
  readonly status: OSARCoreBindingStatus;
  readonly decision: OSARCoreBindingDecision;
  readonly recordReference: string;
  readonly createdAt: string;
}

/**
 * Create CORE binding artifact.
 *
 * Translation only.
 */
export function createOSARCoreBinding(
  record: OSARRecord,
): OSARCoreBinding {
  return Object.freeze({
    status: "CORE_BOUND",
    decision: "VALID",
    recordReference:
      record.authorityReference,
    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate CORE binding dependencies.
 *
 * Structural validation only.
 */
export function validateOSARCoreBinding(
  binding: OSARCoreBinding,
): boolean {
  return (
    binding.status === "CORE_BOUND" &&
    binding.recordReference.length > 0 &&
    binding.createdAt.length > 0 &&
    (
      binding.decision === "VALID" ||
      binding.decision === "REVIEW" ||
      binding.decision === "REJECTED"
    )
  );
}
