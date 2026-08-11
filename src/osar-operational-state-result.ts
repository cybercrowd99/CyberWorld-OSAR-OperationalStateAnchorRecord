/**
 * OSAR — Operational State Result Surface
 *
 * ONE JOB:
 * Record the bounded OSAR operational-state surface as a stable,
 * immutable result without interpreting, mutating, or expanding the
 * operational state.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate OSAR state
 * - create authority
 * - create identity
 * - execute governance
 * - execute organ behavior
 * - contact external services
 */

import type { OSAROperationalStateBoundary } from "./osar-operational-state-boundary";

export interface OSAROperationalStateResult {
  readonly recorded: true;
  readonly recordedAt: string;
  readonly boundary: OSAROperationalStateBoundary;
}

export const recordOSAROperationalStateResult = (
  boundary: OSAROperationalStateBoundary,
): OSAROperationalStateResult =>
  Object.freeze({
    recorded: true as const,
    recordedAt: new Date().toISOString(),
    boundary,
  });
