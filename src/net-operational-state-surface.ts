/**
 * NET — Operational State Display Surface
 *
 * ONE JOB:
 * Display a presented NET operational state in a stable,
 * immutable, read-only form without interpreting, mutating,
 * or expanding it.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate OSAR or NET state
 * - expand lifecycle behavior
 * - create authority
 * - create identity
 * - execute governance
 * - execute organ behavior
 * - contact external services
 */

import type { NETOperationalStatePresentation } from "./net-operational-state-presentation-surface";

export interface NETOperationalStateDisplay {
  readonly displayed: true;
  readonly displayedAt: string;
  readonly presentation: NETOperationalStatePresentation;
}

export const displayNETOperationalState = (
  presentation: NETOperationalStatePresentation,
): NETOperationalStateDisplay =>
  Object.freeze({
    displayed: true as const,
    displayedAt: new Date().toISOString(),
    presentation,
  });
