/**
 * CyberWorld-OSAR
 * 
 * Dissolution Execution Worker
 *
 * Bounded execution handoff organ.
 *
 * Purpose:
 * - receive validated dissolution execution requests
 * - record execution handoff outcome
 *
 * Does NOT:
 * - inspect artifact contents
 * - resolve identity
 * - create authority
 * - mutate OSAR artifacts directly
 * - control Biff
 * - control Dewey
 * - expose deleted data
 * - create financial semantics
 *
 * Execution remains isolated behind an external
 * dissolution execution boundary.
 */

import {
  createOSARProjectionAssuranceIntegrityDissolutionExecutionResult,
} from "../src/osar-projection-assurance-integrity-dissolution-execution-result";


export interface DissolutionExecutionEnvironment {

  /**
   * External execution boundary.
   *
   * The worker only receives completion state.
   */
  readonly executor: {
    execute(
      artifactReference: string,
    ): Promise<{
      completed: boolean;
      witnessReference: string;
    }>;
  };
}


export interface DissolutionExecutionInput {
  readonly artifactReference: string;
  readonly executionRequestReference: string;
}


export interface DissolutionExecutionWorkerResult {
  readonly executionResultReference: string;
  readonly completed: boolean;
}


export const runDissolutionExecution = async (
  env: DissolutionExecutionEnvironment,
  input: DissolutionExecutionInput,
): Promise<DissolutionExecutionWorkerResult> => {

  const execution =
    await env.executor.execute(
      input.artifactReference,
    );


  const result =
    createOSARProjectionAssuranceIntegrityDissolutionExecutionResult({
      executionRequestReference:
        input.executionRequestReference,

      completionWitness:
        execution.witnessReference,

      lineage: [
        input.executionRequestReference,
      ],

      completed:
        execution.completed,
    });


  return Object.freeze({
    executionResultReference:
      result.executionResultReference,

    completed:
      execution.completed,
  });
};
