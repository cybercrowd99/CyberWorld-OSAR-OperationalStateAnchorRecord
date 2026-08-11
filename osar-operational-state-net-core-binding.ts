/**
 * CyberCrowd — OSAR Operational State NET→CORE Binding V1
 *
 * ONE JOB:
 * Bind the declared NET→CORE OSAR recognition binding into the
 * OSAR operational-state boundary as an immutable structural
 * participation record.
 *
 * Structural participation only.
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
  NetCoreEnvelopeOsarBinding,
} from "./net-core-envelope-osar-binding";

export type OsarOperationalStateNetCoreBindingStatus =
  | "OSAR_OPERATIONAL_STATE_NET_CORE_BINDING_CREATED"
  | "OSAR_OPERATIONAL_STATE_NET_CORE_BINDING_INVALID";

export interface OsarOperationalStateNetCoreBinding {
  readonly status:
    OsarOperationalStateNetCoreBindingStatus;

  readonly envelopeReference: string;

  readonly osarDomainAnchor: string;

  readonly osarOperationalStateReference: string;

  readonly osarBoundaryReference: string;

  readonly boundAt: string;
}

export interface CreateOsarOperationalStateNetCoreBindingInput {
  readonly binding: NetCoreEnvelopeOsarBinding;

  readonly osarOperationalStateReference: string;

  readonly osarBoundaryReference: string;
}

/**
 * Creates the immutable structural participation record
 * connecting the NET→CORE OSAR binding to the OSAR
 * operational-state boundary.
 *
 * Structural binding only.
 */
export const createOsarOperationalStateNetCoreBinding = (
  input: CreateOsarOperationalStateNetCoreBindingInput,
): OsarOperationalStateNetCoreBinding => {
  const valid =
    Boolean(input.binding) &&
    input.binding.status ===
      "OSAR_BINDING_CREATED" &&
    Boolean(input.binding.envelopeReference) &&
    Boolean(input.binding.osarDomainAnchor) &&
    Boolean(input.osarOperationalStateReference) &&
    Boolean(input.osarBoundaryReference);

  if (!valid) {
    throw new Error(
      "INVALID_OSAR_OPERATIONAL_STATE_NET_CORE_BINDING_INPUT",
    );
  }

  return Object.freeze({
    status:
      "OSAR_OPERATIONAL_STATE_NET_CORE_BINDING_CREATED",

    envelopeReference:
      input.binding.envelopeReference,

    osarDomainAnchor:
      input.binding.osarDomainAnchor,

    osarOperationalStateReference:
      input.osarOperationalStateReference,

    osarBoundaryReference:
      input.osarBoundaryReference,

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
export const validateOsarOperationalStateNetCoreBinding = (
  binding: OsarOperationalStateNetCoreBinding,
): boolean => {
  return (
    binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_BINDING_CREATED" &&
    Boolean(binding.envelopeReference) &&
    Boolean(binding.osarDomainAnchor) &&
    Boolean(binding.osarOperationalStateReference) &&
    Boolean(binding.osarBoundaryReference) &&
    Boolean(binding.boundAt)
  );
};
