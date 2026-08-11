/**
 * CyberCrowd — OSAR Operational State NET→CORE Result Binding V1
 *
 * ONE JOB:
 * Bind the declared OSAR operational-state NET→CORE participation
 * record into the OSAR operational-state result as an immutable
 * structural result reference.
 *
 * Structural binding only.
 *
 * This file does NOT:
 * - execute behavior
 * - mutate OSAR operational state
 * - mutate NET lineage
 * - mutate CORE state
 * - create authority
 * - create identity
 * - interpret identity
 * - interpret doctrine
 * - authorize behavior
 * - execute governance
 * - expose CORE internals
 * - expose NET implementation details
 */

import type {
  OsarOperationalStateNetCoreBinding,
} from "./osar-operational-state-net-core-binding";

export type OsarOperationalStateNetCoreResultBindingStatus =
  | "OSAR_OPERATIONAL_STATE_NET_CORE_RESULT_BINDING_CREATED"
  | "OSAR_OPERATIONAL_STATE_NET_CORE_RESULT_BINDING_INVALID";

export interface OsarOperationalStateNetCoreResultBinding {
  readonly status:
    OsarOperationalStateNetCoreResultBindingStatus;

  readonly envelopeReference: string;

  readonly osarDomainAnchor: string;

  readonly osarOperationalStateReference: string;

  readonly osarBoundaryReference: string;

  readonly resultReference: string;

  readonly boundAt: string;
}

export interface CreateOsarOperationalStateNetCoreResultBindingInput {
  readonly binding: OsarOperationalStateNetCoreBinding;

  readonly resultReference: string;
}

/**
 * Creates the immutable structural result binding for
 * the declared OSAR operational-state NET→CORE participation.
 *
 * Structural binding only.
 */
export const createOsarOperationalStateNetCoreResultBinding = (
  input: CreateOsarOperationalStateNetCoreResultBindingInput,
): OsarOperationalStateNetCoreResultBinding => {
  const valid =
    Boolean(input.binding) &&
    input.binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_BINDING_CREATED" &&
    Boolean(input.binding.envelopeReference) &&
    Boolean(input.binding.osarDomainAnchor) &&
    Boolean(input.binding.osarOperationalStateReference) &&
    Boolean(input.binding.osarBoundaryReference) &&
    Boolean(input.resultReference);

  if (!valid) {
    throw new Error(
      "INVALID_OSAR_OPERATIONAL_STATE_NET_CORE_RESULT_BINDING_INPUT",
    );
  }

  return Object.freeze({
    status:
      "OSAR_OPERATIONAL_STATE_NET_CORE_RESULT_BINDING_CREATED",

    envelopeReference:
      input.binding.envelopeReference,

    osarDomainAnchor:
      input.binding.osarDomainAnchor,

    osarOperationalStateReference:
      input.binding.osarOperationalStateReference,

    osarBoundaryReference:
      input.binding.osarBoundaryReference,

    resultReference:
      input.resultReference,

    boundAt:
      new Date().toISOString(),
  });
};

/**
 * Structural validation only.
 *
 * Does not dereference, interpret, mutate, or execute
 * any referenced OSAR, NET, or CORE artifact.
 */
export const validateOsarOperationalStateNetCoreResultBinding = (
  binding: OsarOperationalStateNetCoreResultBinding,
): boolean => {
  return (
    binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_RESULT_BINDING_CREATED" &&
    Boolean(binding.envelopeReference) &&
    Boolean(binding.osarDomainAnchor) &&
    Boolean(binding.osarOperationalStateReference) &&
    Boolean(binding.osarBoundaryReference) &&
    Boolean(binding.resultReference) &&
    Boolean(binding.boundAt)
  );
};
