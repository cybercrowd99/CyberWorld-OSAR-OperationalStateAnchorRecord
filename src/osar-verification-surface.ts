/**
 * OSAR — Verification Surface
 *
 * ONE JOB:
 * Check that an OSAR doctrine artifact is shaped correctly
 * before it moves further in the OSAR flow.
 *
 * This surface does not:
 * - interpret the artifact
 * - run governance logic
 * - modify the artifact
 * - create authority or identity
 */

import type { OSARDoctrineArtifact } from "./osar-attachment-surface";

export interface OSARVerificationResult {
  readonly valid: boolean;
  readonly reason?: string;
}

export const verifyOSARArtifact = (
  artifact: OSARDoctrineArtifact | null,
): OSARVerificationResult => {
  if (!artifact) {
    return { valid: false, reason: "artifact is null" };
  }

  if (typeof artifact.type !== "string" || artifact.type.trim().length === 0) {
    return { valid: false, reason: "missing or empty type field" };
  }

  if (
    typeof artifact.version !== "string" ||
    artifact.version.trim().length === 0
  ) {
    return { valid: false, reason: "missing or empty version field" };
  }

  return { valid: true };
};
