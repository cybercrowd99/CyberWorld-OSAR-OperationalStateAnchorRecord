/**
 * OSAR — Preparation Surface
 *
 * ONE JOB:
 * Take a stabilized OSAR doctrine artifact and prepare it for downstream
 * operational use without interpreting, transforming, or expanding it.
 *
 * This surface does not:
 * - apply governance logic
 * - interpret the artifact
 * - mutate the artifact
 * - generate authority or identity
 *
 * It simply prepares the stabilized artifact into a ready-to-use operational shape.
 */

import type { OSARStabilized } from "./osar-stabilization-surface";

export interface OSARPrepared {
  readonly prepared: true;
  readonly preparedAt: string;
  readonly artifact: OSARStabilized["artifact"];
  readonly stabilized: OSARStabilized;
}

export const prepareOSARArtifact = (
  stabilized: OSARStabilized | null,
): OSARPrepared | null => {
  if (!stabilized) {
    return null;
  }

  return Object.freeze({
    prepared: true as const,
    preparedAt: new Date().toISOString(),
    artifact: stabilized.artifact,
    stabilized,
  });
};
