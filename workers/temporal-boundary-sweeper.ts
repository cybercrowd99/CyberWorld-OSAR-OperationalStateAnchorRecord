/**
 * CyberWorld-OSAR
 * 
 * Temporal Boundary Sweeper
 *
 * Blind lifecycle sweeper.
 *
 * Purpose:
 * - query expired temporal boundaries
 * - emit dissolution request signals
 *
 * Does NOT:
 * - inspect artifacts
 * - resolve identity
 * - access content
 * - execute deletion
 * - control vaults
 * - control Biff
 * - control Dewey
 * - mutate OSAR artifacts
 *
 * It only observes time expiration.
 */

import {
  TemporalBoundaryIndex,
} from "../src/temporal/temporal-boundary-index";

import {
  createOSARProjectionAssuranceIntegrityDissolutionRequest,
} from "../src/osar-projection-assurance-integrity-dissolution-request";


export interface TemporalSweeperEnvironment {
  readonly temporalBoundaryIndex: TemporalBoundaryIndex;
}


export interface TemporalSweepResult {
  readonly scannedAt: number;
  readonly expiredCount: number;
  readonly requestedCount: number;
}


export const runTemporalBoundarySweep = async (
  env: TemporalSweeperEnvironment,
  currentTime: number = Date.now(),
): Promise<TemporalSweepResult> => {

  const expired =
    await env.temporalBoundaryIndex.findExpired(
      currentTime,
    );


  let requestedCount = 0;


  for (const boundary of expired) {

    const request =
      createOSARProjectionAssuranceIntegrityDissolutionRequest({
        artifactReference:
          boundary.artifactReference,

        reason:
          "TEMPORAL_BOUNDARY_EXPIRED",

        lineage: [
          boundary.artifactReference,
        ],
      });


    if (request) {
      requestedCount++;
    }
  }


  return Object.freeze({
    scannedAt: currentTime,
    expiredCount: expired.length,
    requestedCount,
  });
};
