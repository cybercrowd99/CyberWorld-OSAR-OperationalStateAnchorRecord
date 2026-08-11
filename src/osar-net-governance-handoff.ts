/**
 * OSAR — NET Governance Handoff
 *
 * ONE JOB:
 * Carry a completed OSAR operational state anchor across the declared
 * OSAR → NET governance boundary.
 *
 * This surface does not:
 * - execute governance
 * - interpret doctrine
 * - mutate the OSAR record
 * - create authority
 * - create identity
 * - execute NET behavior
 * - contact external services
 */

import type { OSAROperationalStateAnchorRecord } from "./osar-operational-state-anchor-record-surface";

export interface OSARNetGovernanceHandoff {
  readonly type: "osar-net-governance-handoff";
  readonly version: "OSAR-NET-GOVERNANCE-HANDOFF-1";
  readonly handedOff: true;
  readonly handedOffAt: string;
  readonly anchor: OSAROperationalStateAnchorRecord;
}

export const handoffOSARToNetGovernance = (
  anchor: OSAROperationalStateAnchorRecord,
): OSARNetGovernanceHandoff =>
  Object.freeze({
    type: "osar-net-governance-handoff",
    version: "OSAR-NET-GOVERNANCE-HANDOFF-1",
    handedOff: true as const,
    handedOffAt: new Date().toISOString(),
    anchor,
  });
