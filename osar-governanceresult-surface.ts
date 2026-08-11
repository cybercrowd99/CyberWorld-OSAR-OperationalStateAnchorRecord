/**
 * OSAR — Governance Result Surface
 *
 * ONE JOB:
 * Record the outcome of governance execution for a routed OSAR doctrine
 * artifact without interpreting, mutating, or expanding the result.
 *
 * This surface does not:
 * - interpret doctrine
 * - expand governance behavior
 * - mutate the artifact
 * - create authority
 * - create identity
 * - contact external services
 * - perform side effects outside declared governance execution
 */

import type { OSARGovernance } from "./osar-governance-surface";

export interface OSARGovernanceResult {
  readonly resultRecorded: true;
  readonly resultRecordedAt: string;
  readonly governance: OSARGovernance;
}

export const recordOSARGovernanceResult = (
  governance: OSARGovernance,
): OSARGovernanceResult =>
  Object.freeze({
    resultRecorded: true as const,
    resultRecordedAt: new Date().toISOString(),
    governance,
  });
