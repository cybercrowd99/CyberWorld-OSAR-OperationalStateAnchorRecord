/**
 * CyberWorld-OSAR — OSARAnchorRegistry Continuity Artifact
 * 
 * OSARAnchorRegistry defines the bounded registry mechanism
 * responsible for maintaining OSARAnchor continuity.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state
 * - redefine anchor meaning
 * - bypass lifecycle rules
 * - control world state
 *
 * Registry reference only:
 * - preserves anchor registration
 * - maintains lineage continuity
 * - supports retrieval validation
 * - tracks lifecycle position
 */

import { OSARAnchor } from "./osar-anchor";

export type OSARAnchorRegistryStatus =
  | "REGISTRY_ACTIVE";

/**
 * Registry artifact.
 *
 * Maintains anchor continuity only.
 */
export interface OSARAnchorRegistry {
  /**
   * Artifact discriminator.
   */
  readonly status: OSARAnchorRegistryStatus;

  /**
   * Registry reference identifier.
   */
  readonly registryReference: string;

  /**
   * Registered anchors.
   */
  readonly anchors: readonly OSARAnchor[];

  /**
   * Registry creation time.
   */
  readonly createdAt: string;
}

/**
 * Register anchor into registry.
 *
 * Pure continuity operation.
 *
 * No authority.
 * No ownership.
 * No state creation.
 */
export function registerOSARAnchor(
  registry: OSARAnchorRegistry,
  anchor: OSARAnchor,
): OSARAnchorRegistry {
  return Object.freeze({
    ...registry,
    anchors: Object.freeze([
      ...registry.anchors,
      anchor,
    ]),
  });
}

/**
 * Create OSARAnchorRegistry artifact.
 */
export function createOSARAnchorRegistry(input: {
  registryReference: string;
  anchors?: readonly OSARAnchor[];
  createdAt?: string;
}): OSARAnchorRegistry {
  return Object.freeze({
    status: "REGISTRY_ACTIVE",
    registryReference: input.registryReference,
    anchors: Object.freeze([
      ...(input.anchors ?? []),
    ]),
    createdAt:
      input.createdAt ?? new Date().toISOString(),
  });
}

/**
 * Retrieve anchor by reference.
 *
 * Structural lookup only.
 */
export function retrieveOSARAnchor(
  registry: OSARAnchorRegistry,
  anchorReference: string,
): OSARAnchor | undefined {
  return registry.anchors.find(
    (anchor) =>
      anchor.attachedObject === anchorReference,
  );
}

/**
 * Validate registry structure.
 *
 * Structural validation only.
 */
export function validateOSARAnchorRegistry(
  registry: OSARAnchorRegistry,
): boolean {
  return (
    registry.status === "REGISTRY_ACTIVE" &&
    registry.registryReference.length > 0 &&
    Array.isArray(registry.anchors) &&
    registry.createdAt.length > 0
  );
}
