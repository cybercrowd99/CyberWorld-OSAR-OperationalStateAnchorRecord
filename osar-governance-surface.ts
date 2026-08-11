/**
 * OSAR — Governance Surface
 *
 * ONE JOB:
 * Execute the declared governance behavior for a routed OSAR doctrine
 * artifact without expanding authority, mutating identity, or altering
 * the artifact’s declared meaning.
 *
 * This surface does not:
 * - interpret doctrine beyond declared governance rules
 * - mutate the artifact
 * - create authority
 * - create identity
 * - expand behavior
 * - contact external services
 * - perform side effects outside declared governance execution
 */

import type { OSARRouting } from "./osar-routing-surface";

export interface OSARGovernance {
  readonly governed: true;
  readonly governedAt: string;
  readonly routing: OSARRouting;
}

export const governOSARArtifact = (
  routing: OSARRouting,
): OSARGovernance =>
  Object.freeze({
    governed: true as const,
    governedAt: new Date().toISOString(),
    routing,
  });
