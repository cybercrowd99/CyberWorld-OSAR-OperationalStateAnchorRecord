/**
 * OSAR — Operational State Organ Participation Surface
 *
 * ONE JOB:
 * Carry a routed OSAR operational-state result into the declared
 * organ participation pathway without interpreting, mutating, or
 * expanding the operational state.
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

import type { OSAROperationalStateRoute } from "./osar-operational-state-router-surface";

export interface OSAROperationalStateOrganParticipation {
  readonly participating: true;
  readonly participatingAt: string;
  readonly route: OSAROperationalStateRoute;
}

export const participateOSAROperationalStateInOrgan = (
  route: OSAROperationalStateRoute,
): OSAROperationalStateOrganParticipation =>
  Object.freeze({
    participating: true as const,
    participatingAt: new Date().toISOString(),
    route,
  });
