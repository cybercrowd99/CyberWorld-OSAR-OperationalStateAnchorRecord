/**
 * NET — Operational State Organ Attachment
 *
 * ONE JOB:
 * Carry an established NET operational-state surface into a declared
 * CyberCrowd organ attachment without interpreting, mutating, or
 * expanding the operational state.
 *
 * This surface does not:
 * - interpret doctrine
 * - mutate OSAR state
 * - mutate NET state
 * - create authority
 * - create identity
 * - execute governance
 * - execute organ behavior
 * - contact external services
 */

import type { NETOperationalStateSurface } from "./net-operational-state-surface";

export interface NETOperationalStateOrganAttachment {
  readonly attached: true;
  readonly attachedAt: string;
  readonly surface: NETOperationalStateSurface;
}

export const attachNETOperationalStateToOrgan = (
  surface: NETOperationalStateSurface,
): NETOperationalStateOrganAttachment =>
  Object.freeze({
    attached: true as const,
    attachedAt: new Date().toISOString(),
    surface,
  });
