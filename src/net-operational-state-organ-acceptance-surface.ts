/**
 * NET — Operational State Organ Acceptance Surface
 *
 * ONE JOB:
 * Accept a verified NET operational-state surface inside the
 * CyberCrowd organ boundary without interpreting, mutating, or
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

import type { NETOperationalStateOrganVerification } from "./net-operational-state-organ-verification-surface";

export interface NETOperationalStateOrganAcceptance {
  readonly accepted: true;
  readonly acceptedAt: string;
  readonly verification: NETOperationalStateOrganVerification;
}

export const acceptNETOperationalStateOrgan = (
  verification: NETOperationalStateOrganVerification,
): NETOperationalStateOrganAcceptance =>
  Object.freeze({
    accepted: true as const,
    acceptedAt: new Date().toISOString(),
    verification,
  });
