/**
 * CyberWorld-OSAR — OSARDoctrineBinding Artifact
 * 
 * OSARDoctrineBinding defines the bounded attachment layer
 * connecting OSAR artifacts to declared doctrine requirements.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create permissions
 * - modify operational state
 * - modify world state
 *
 * Doctrine binding only:
 * - preserves rule references
 * - confirms invariant alignment
 * - preserves validation lineage
 * - maintains structural compatibility
 */

import {
  InvariantIndex,
  validateInvariantIndex,
} from "./invariant-index";

export type OSARDoctrineBindingStatus =
  | "DOCTRINE_BOUND";

export type OSARDoctrineDecision =
  | "ALIGNED"
  | "REVIEW"
  | "INVALID";

/**
 * Doctrine binding artifact.
 */
export interface OSARDoctrineBinding {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARDoctrineBindingStatus;

  /**
   * Doctrine reference.
   */
  readonly doctrineReference:
    string;

  /**
   * Invariant index reference.
   */
  readonly invariantReference:
    string;

  /**
   * Binding decision.
   */
  readonly decision:
    OSARDoctrineDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create doctrine binding artifact.
 *
 * Doctrine attachment only.
 */
export function createOSARDoctrineBinding(input: {
  doctrineReference: string;
  invariantIndex: InvariantIndex;
}): OSARDoctrineBinding {

  const decision: OSARDoctrineDecision =
    validateInvariantIndex(input.invariantIndex)
      ? "ALIGNED"
      : "REVIEW";

  return Object.freeze({
    status:
      "DOCTRINE_BOUND",

    doctrineReference:
      input.doctrineReference,

    invariantReference:
      input.invariantIndex.status,

    decision,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate doctrine binding structure.
 *
 * Structural validation only.
 */
export function validateOSARDoctrineBinding(
  binding: OSARDoctrineBinding,
): boolean {

  return (
    binding.status ===
      "DOCTRINE_BOUND" &&
    binding.doctrineReference.length > 0 &&
    binding.invariantReference.length > 0 &&
    binding.createdAt.length > 0 &&
    (
      binding.decision === "ALIGNED" ||
      binding.decision === "REVIEW" ||
      binding.decision === "INVALID"
    )
  );
}
