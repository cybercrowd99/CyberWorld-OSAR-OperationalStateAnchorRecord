/**
 * NET — Operational State Connection Surface
 *
 * ONE JOB:
 * Carry a reflected OSAR operational state into the established
 * CyberCrowd-facing NET connection surface without interpreting,
 * mutating, or expanding it.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate OSAR state
 * - expand lifecycle behavior
 * - create authority
 * - create identity
 * - execute governance
 * - execute organ behavior
 * - contact external services
 */

import type { NETOperationalStateReflection } from "./net-operational-state-reflection-surface";

export interface NETOperationalStateConnection {
  readonly connected: true;
  readonly connectedAt: string;
  readonly reflection: NETOperationalStateReflection;
}

export const connectNETOperationalState = (
  reflection: NETOperationalStateReflection,
): NETOperationalStateConnection =>
  Object.freeze({
    connected: true as const,
    connectedAt: new Date().toISOString(),
    reflection,
  });
