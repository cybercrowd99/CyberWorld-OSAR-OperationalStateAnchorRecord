/**
 * OSAR — Operational State Governance Surface
 *
 * ONE JOB:
 * Declare governance readiness of the participating OSAR operational-state
 * result without interpreting, mutating, or expanding the operational state.
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

import type { OSAROperationalStateParticipation } from "./osar-operational-state-participation";

export interface OSAROperationalStateGovernance {
  readonly governanceReady: true;
  readonly governanceReadyAt: string;
  readonly participation: OSAROperationalStateParticipation;
}

export const declareOSAROperationalStateGovernance = (
  participation: OSAROperationalStateParticipation,
): OSAROperationalStateGovernance =>
  Object.freeze({
    governanceReady: true as const,
    governanceReadyAt: new Date().toISOString(),
    participation,
  });
