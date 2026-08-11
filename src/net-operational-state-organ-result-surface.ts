/**
 * NET — Operational State Organ Result Surface
 *
 * ONE JOB:
 * Record the accepted NET operational-state organ attachment as a
 * stable immutable result without interpreting, mutating, or
 * expanding the operational state.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate OSAR state
 * - mutate NET state
 * - expand lifecycle behavior
 * - create authority
 * - create identity
 * - execute governance
 * - execute organ behavior
 * - contact external services
 */

import type { NETOperationalStateOrganAcceptance } from "./net-operational-state-organ-acceptance-surface";

export interface NETOperationalStateOrganResult {
  readonly recorded: true;
  readonly recordedAt: string;
  readonly acceptance: NETOperationalStateOrganAcceptance;
}

export const recordNETOperationalStateOrganResult = (
  acceptance: NETOperationalStateOrganAcceptance,
): NETOperationalStateOrganResult =>
  Object.freeze({
    recorded: true as const,
    recordedAt: new Date().toISOString(),
    acceptance,
  });
