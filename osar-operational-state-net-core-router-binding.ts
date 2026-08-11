/**
 * CyberCrowd — OSAR Operational State NET→CORE Router Binding V1
 *
 * ONE JOB:
 * Bind the declared OSAR operational-state NET→CORE result
 * binding into the OSAR operational-state routing boundary as
 * an immutable structural routing reference.
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
  OsarOperationalStateNetCoreResultBinding,
} from "./osar-operational-state-net-core-result-binding";

export type OsarOperationalStateNetCoreRouterBindingStatus =
  | "OSAR_OPERATIONAL_STATE_NET_CORE_ROUTER_BINDING_CREATED"
  | "OSAR_OPERATIONAL_STATE_NET_CORE_ROUTER_BINDING_INVALID";

export interface OsarOperationalStateNetCoreRouterBinding {
  readonly status:
    OsarOperationalStateNetCoreRouterBindingStatus;

  readonly envelopeReference: string;

  readonly osarDomainAnchor: string;

  readonly osarOperationalStateReference: string;

  readonly osarBoundaryReference: string;

  readonly resultReference: string;

  readonly routerReference: string;

  readonly boundAt: string;
}

export interface CreateOsarOperationalStateNetCoreRouterBindingInput {
  readonly binding: OsarOperationalStateNetCoreResultBinding;

  readonly routerReference: string;
}

/**
 * Creates the immutable structural routing reference for
 * the declared OSAR operational-state NET→CORE result.
 *
 * Structural binding only.
 */
export const createOsarOperationalStateNetCoreRouterBinding = (
  input: CreateOsarOperationalStateNetCoreRouterBindingInput,
): OsarOperationalStateNetCoreRouterBinding => {
  const valid =
    Boolean(input.binding) &&
    input.binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_RESULT_BINDING_CREATED" &&
    Boolean(input.binding.envelopeReference) &&
    Boolean(input.binding.osarDomainAnchor) &&
    Boolean(input.binding.osarOperationalStateReference) &&
    Boolean(input.binding.osarBoundaryReference) &&
    Boolean(input.binding.resultReference) &&
    Boolean(input.routerReference);

  if (!valid) {
    throw new Error(
      "INVALID_OSAR_OPERATIONAL_STATE_NET_CORE_ROUTER_BINDING_INPUT",
    );
  }

  return Object.freeze({
    status:
      "OSAR_OPERATIONAL_STATE_NET_CORE_ROUTER_BINDING_CREATED",

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
      input.routerReference,

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
export const validateOsarOperationalStateNetCoreRouterBinding = (
  binding: OsarOperationalStateNetCoreRouterBinding,
): boolean => {
  return (
    binding.status ===
      "OSAR_OPERATIONAL_STATE_NET_CORE_ROUTER_BINDING_CREATED" &&
    Boolean(binding.envelopeReference) &&
    Boolean(binding.osarDomainAnchor) &&
    Boolean(binding.osarOperationalStateReference) &&
    Boolean(binding.osarBoundaryReference) &&
    Boolean(binding.resultReference) &&
    Boolean(binding.routerReference) &&
    Boolean(binding.boundAt)
  );
};
