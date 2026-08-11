/**
 * OSAR — Operational State Boundary Surface
 *
 * ONE JOB:
 * Establish a declared OSAR operational-state boundary that freezes the
 * verified OSAR surface for organ-level participation without interpreting,
 * mutating, or expanding the operational state.
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

import type { OSARVerifiedOperationalStateSurface } from "./osar-verified-operational-state-surface";

export interface OSAROperationalStateBoundary {
  readonly bounded: true;
  readonly boundedAt: string;
  readonly surface: OSARVerifiedOperationalStateSurface;
}

export const declareOSAROperationalStateBoundary = (
  surface: OSARVerifiedOperationalStateSurface,
): OSAROperationalStateBoundary =>
  Object.freeze({
    bounded: true as const,
    boundedAt: new Date().toISOString(),
    surface,
  });
