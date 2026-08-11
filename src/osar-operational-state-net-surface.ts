/**
 * OSAR — Operational State NET Surface
 *
 * ONE JOB:
 * Carry a mirrored OSAR operational state into the established NET
 * surface as a bounded, immutable handoff.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate the OSAR state
 * - expand lifecycle behavior
 * - create authority
 * - create identity
 * - execute governance
 * - perform NET behavior
 * - contact external services
 */

import type { OSAROperationalStateMirror } from "./osar-operational-state-mirror-surface";

export interface OSAROperationalStateNetSurface {
  readonly connected: true;
  readonly connectedAt: string;
  readonly mirror: OSAROperationalStateMirror;
}

export const connectOSAROperationalStateToNet = (
  mirror: OSAROperationalStateMirror,
): OSAROperationalStateNetSurface =>
  Object.freeze({
    connected: true as const,
    connectedAt: new Date().toISOString(),
    mirror,
  });
