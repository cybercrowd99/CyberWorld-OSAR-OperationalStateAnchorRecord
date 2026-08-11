/**
 * OSAR — Operational State Exposure Surface
 *
 * ONE JOB:
 * Expose an anchored OSAR operational state record in a stable,
 * immutable, read-only form without interpreting, mutating, or expanding it.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate the artifact
 * - expand lifecycle behavior
 * - create authority
 * - create identity
 * - execute governance
 * - contact external services
 */

import type { OSAROperationalStateAnchorRecord } from "./osar-operationalstateanchorrecord-surface";

export interface OSAROperationalStateExposure {
  readonly exposed: true;
  readonly exposedAt: string;
  readonly anchor: OSAROperationalStateAnchorRecord;
}

export const exposeOSAROperationalState = (
  anchor: OSAROperationalStateAnchorRecord,
): OSAROperationalStateExposure =>
  Object.freeze({
    exposed: true as const,
    exposedAt: new Date().toISOString(),
    anchor,
  });
