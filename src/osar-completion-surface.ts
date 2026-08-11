/**
 * OSAR — Completion Surface
 *
 * ONE JOB:
 * Mark a recorded governance result as fully complete within the OSAR
 * lifecycle without interpreting, mutating, or expanding the artifact.
 *
 * This surface does not:
 * - interpret doctrine
 * - expand governance behavior
 * - mutate the artifact
 * - create authority
 * - create identity
 * - contact external services
 * - perform side effects
 */

import type { OSARGovernanceResult } from "./osar-governanceresult-surface";

export interface OSARCompletion {
  readonly completed: true;
  readonly completedAt: string;
  readonly result: OSARGovernanceResult;
}

export const completeOSARArtifact = (
  result: OSARGovernanceResult,
): OSARCompletion =>
  Object.freeze({
    completed: true as const,
    completedAt: new Date().toISOString(),
    result,
  });
