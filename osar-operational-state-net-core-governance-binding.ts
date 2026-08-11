/**
 * CyberCrowd — OSAR Operational State NET→CORE Governance Binding V1
 *
 * ONE JOB:
 * Bind the declared OSAR operational-state NET→CORE router
 * reference into the OSAR operational-state governance boundary
 * as an immutable structural governance-readiness reference.
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
  OsarOperationalStateNetCoreRouterBinding,
} from "./osar-operational-state-net-core-router-binding";

export type OsarOperationalStateNetCoreGovernanceBindingStatus =
  | "OSAR_OPERATIONAL_STATE_NET_CORE_GOVERNANCE_BINDING_CREATED"
  | "OSAR_OPERATIONAL_STATE_NET_CORE_GOVERNANCE_BINDING_INVALID";

export interface OsarOperationalStateNetCoreGovernanceBinding {
  readonly status:
    OsarOperationalStateNetCoreGovernanceBindingStatus;

  readonly envelopeReference: string;

  readonly osarDomainAnchor: string;

  readonly osarOperationalStateReference: string;

  readonly osarBoundaryReference: string;

  readonly resultReference: string;

  readonly routerReference: string;

  readonly governanceReference: string;

  readonly boundAt: string;
}

export interface CreateOsarOperationalStateNetCoreGovernanceBindingInput {
  readonly binding: OsarOperationalStateNetCoreRouterBinding;

  readonly governanceReference: string;
}

/**
 * Creates the immutable structural governance reference
 * for the declared OSAR operational-state NET→CORE route.
 *
 * Structural binding only.
 */
export const createOsarOperationalStateNetCoreGovernanceBinding = (
  input: CreateOsarOperationalStateNetCoreGovernanceBindingInput,
): OsarOperationalStateNetCoreGovernanceBinding => {
  const valid =
    Boolean(input.binding) &&
    input.binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_ROUTER_BINDING_CREATED" &&
    Boolean(input.binding.envelopeReference) &&
    Boolean(input.binding.osarDomainAnchor) &&
    Boolean(input.binding.osarOperationalStateReference) &&
    Boolean(input.binding.osarBoundaryReference) &&
    Boolean(input.binding.resultReference) &&
    Boolean(input.binding.routerReference) &&
    Boolean(input.governanceReference);

  if (!valid) {
    throw new Error(
      "INVALID_OSAR_OPERATIONAL_STATE_NET_CORE_GOVERNANCE_BINDING_INPUT",
    );
  }

  return Object.freeze({
    status:
      "OSAR_OPERATIONAL_STATE_NET_CORE_GOVERNANCE_BINDING_CREATED",

    envelopeReference:
      input.binding.envelopeReference,

    osarDomainAnchor:
      input.binding.osarDomainAnchor,

    osarOperationalStateReference:
      input.binding.osarOperationalStateReference,

    osarBoundaryReference:
      input.binding.osarBoundaryReference,

    resultReference:
      input.binding.resultReference,

    routerReference:
      input.binding.routerReference,

    governanceReference:
      input.governanceReference,

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
export const validateOsarOperationalStateNetCoreGovernanceBinding = (
  binding: OsarOperationalStateNetCoreGovernanceBinding,
): boolean => {
  return (
    binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_GOVERNANCE_BINDING_CREATED" &&
    Boolean(binding.envelopeReference) &&
    Boolean(binding.osarDomainAnchor) &&
    Boolean(binding.osarOperationalStateReference) &&
    Boolean(binding.osarBoundaryReference) &&
    Boolean(binding.resultReference) &&
    Boolean(binding.routerReference) &&
    Boolean(binding.governanceReference) &&
    Boolean(binding.boundAt)
  );
};
