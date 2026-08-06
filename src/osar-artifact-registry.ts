/**
 * CyberWorld-OSAR — OSARArtifactRegistry Artifact
 * 
 * OSARArtifactRegistry defines the bounded registry layer
 * responsible for maintaining structural references between
 * approved OSAR artifacts.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create permissions
 * - modify operational state
 * - modify world state
 *
 * Registry only:
 * - preserves artifact references
 * - maintains structural continuity
 * - supports validation lookup
 * - preserves doctrine alignment
 */

import {
  OSARDoctrineBinding,
  validateOSARDoctrineBinding,
} from "./osar-doctrine-binding";

export type OSARArtifactRegistryStatus =
  | "ARTIFACT_REGISTRY_ACTIVE";

export type OSARArtifactRegistryDecision =
  | "VALID"
  | "REVIEW"
  | "INVALID";

/**
 * Artifact registry.
 */
export interface OSARArtifactRegistry {
  /**
   * Artifact discriminator.
   */
  readonly status:
    OSARArtifactRegistryStatus;

  /**
   * Registered artifact references.
   */
  readonly artifacts:
    readonly string[];

  /**
   * Doctrine validation reference.
   */
  readonly doctrineReference:
    string;

  /**
   * Registry decision.
   */
  readonly decision:
    OSARArtifactRegistryDecision;

  /**
   * Creation timestamp.
   */
  readonly createdAt:
    string;
}

/**
 * Create OSAR artifact registry.
 *
 * Structural registration only.
 */
export function createOSARArtifactRegistry(input: {
  doctrineBinding:
    OSARDoctrineBinding;
  artifacts:
    readonly string[];
}): OSARArtifactRegistry {

  const decision: OSARArtifactRegistryDecision =
    validateOSARDoctrineBinding(input.doctrineBinding)
      ? "VALID"
      : "REVIEW";

  return Object.freeze({
    status:
      "ARTIFACT_REGISTRY_ACTIVE",

    artifacts:
      Object.freeze([
        ...input.artifacts,
      ]),

    doctrineReference:
      input.doctrineBinding.doctrineReference,

    decision,

    createdAt:
      new Date().toISOString(),
  });
}

/**
 * Validate artifact registry structure.
 *
 * Structural validation only.
 */
export function validateOSARArtifactRegistry(
  registry: OSARArtifactRegistry,
): boolean {

  return (
    registry.status ===
      "ARTIFACT_REGISTRY_ACTIVE" &&
    registry.artifacts.length > 0 &&
    registry.doctrineReference.length > 0 &&
    registry.createdAt.length > 0 &&
    (
      registry.decision === "VALID" ||
      registry.decision === "REVIEW" ||
      registry.decision === "INVALID"
    )
  );
}
