/**
 * OSAR — Processing Surface
 *
 * ONE JOB:
 * Prepare a prepared OSAR doctrine artifact for downstream governance
 * routing without interpreting, expanding, or executing it.
 *
 * This surface does not:
 * - interpret doctrine
 * - extract meaning
 * - apply governance
 * - create authority
 * - create identity
 * - execute behavior
 * - contact external services
 * - mutate the supplied artifact
 */

import type { OSARPreparation } from "./osar-preparation-surface";

export interface OSARProcessing {
  readonly processed: true;
  readonly processedAt: string;
  readonly prepared: OSARPreparation;
}

export const processOSARArtifact = (
  prepared: OSARPreparation,
): OSARProcessing =>
  Object.freeze({
    processed: true as const,
    processedAt: new Date().toISOString(),
    prepared,
  });
