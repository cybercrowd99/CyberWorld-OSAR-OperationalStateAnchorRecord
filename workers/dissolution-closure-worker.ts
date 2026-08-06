/**
 * CyberWorld-OSAR
 * 
 * Dissolution Closure Worker
 *
 * Bounded lifecycle closure organ.
 *
 * Purpose:
 * - receive completed dissolution execution results
 * - create closure representation
 * - preserve minimal lifecycle finality reference
 *
 * Does NOT:
 * - inspect artifact contents
 * - restore dissolved artifacts
 * - resolve identity
 * - create ownership
 * - expose deleted state
 * - control vault systems
 * - control Biff lanes
 * - control Dewey surfaces
 * - mutate historical proof lineage
 *
 * Closure is a receipt of lifecycle completion,
 * not a record of the dissolved artifact.
 */

import {
  createOSARProjectionAssuranceIntegrityDissolutionClosure,
} from "../src/osar-projection-assurance-integrity-dissolution-closure";


export interface DissolutionClosureEnvironment {
  readonly executionResultReference: string;
}


export interface DissolutionClosureInput {
  readonly artifactReference: string;
  readonly executionRequestReference: string;
  readonly executionResultReference: string;
  readonly completionWitness: string;
}


export interface DissolutionClosureWorkerResult {
  readonly closureReference: string;
  readonly status: "CLOSED" | "REVIEW";
}


export const runDissolutionClosure = (
  env: DissolutionClosureEnvironment,
  input: DissolutionClosureInput,
): DissolutionClosureWorkerResult => {

  const closure =
    createOSARProjectionAssuranceIntegrityDissolutionClosure({
      artifactReference:
        input.artifactReference,

      executionRequestReference:
        input.executionRequestReference,

      executionResultReference:
        input.executionResultReference,

      completionWitness:
        input.completionWitness,

      lineage: [
        input.executionRequestReference,
        input.executionResultReference,
      ],
    });


  return Object.freeze({
    closureReference:
      closure.closureReference,

    status:
      closure.decision === "CLOSED"
        ? "CLOSED"
        : "REVIEW",
  });
};
