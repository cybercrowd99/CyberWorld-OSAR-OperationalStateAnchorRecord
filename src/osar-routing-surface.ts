/**
 * OSAR — Routing Surface
 *
 * ONE JOB:
 * Determine the declared downstream governance route for a processed
 * OSAR doctrine artifact.
 *
 * This surface does not:
 * - interpret doctrine
 * - execute governance
 * - mutate the artifact
 * - create authority
 * - create identity
 * - execute a service
 * - contact external services
 */

import type { OSARProcessing } from "./osar-processing-surface";

export type OSARRoute =
  | "GOVERNANCE"
  | "UNROUTED";

export interface OSARRouting {
  readonly route: OSARRoute;
  readonly routedAt: string;
  readonly processed: OSARProcessing;
}

export const routeOSARArtifact = (
  processed: OSARProcessing,
): OSARRouting =>
  Object.freeze({
    route: "GOVERNANCE" as const,
    routedAt: new Date().toISOString(),
    processed,
  });
