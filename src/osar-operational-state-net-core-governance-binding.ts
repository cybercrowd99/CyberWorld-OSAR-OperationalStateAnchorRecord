/**
 * CyberCrowd — OSAR Operational-State NET→CORE Governance Binding V1
 *
 * ONE JOB:
 * Bind the declared OSAR operational-state NET→CORE router result
 * into the existing OSAR governance-recognition boundary.
 *
 * Structural binding only.
 *
 * This file does NOT:
 * - execute behavior
 * - mutate OSAR state
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
  | "OSAR_NET_CORE_GOVERNANCE_BINDING_CREATED"
  | "OSAR_NET_CORE_GOVERNANCE_BINDING_INVALID";

export interface OsarOperationalStateNetCoreGovernanceBinding {
  readonly status:
    OsarOperationalStateNetCoreGovernanceBindingStatus;

  readonly routerBindingReference: string;

  /**
   * Existing OSAR governance surface reference.
   *
   * Structural recognition only.
   */
  readonly osarGovernanceReference: string;

  /**
   * Immutable OSAR operational-state governance anchor.
   */
  readonly osarGovernanceAnchor: string;

  /**
   * Immutable NET→CORE governance recognition anchor.
   */
  readonly netCoreGovernanceAnchor: string;

  /**
   * Creation timestamp for the structural binding.
   */
  readonly boundAt: string;
}

export interface CreateOsarOperationalStateNetCoreGovernanceBindingInput {
  readonly routerBinding:
    OsarOperationalStateNetCoreRouterBinding;

  readonly osarGovernanceReference: string;

  readonly osarGovernanceAnchor: string;

  readonly netCoreGovernanceAnchor: string;
}

/**
 * Creates the immutable OSAR operational-state NET→CORE
 * governance binding.
 *
 * Structural binding only.
 */
export const createOsarOperationalStateNetCoreGovernanceBinding = (
  input:
    CreateOsarOperationalStateNetCoreGovernanceBindingInput,
): OsarOperationalStateNetCoreGovernanceBinding => {
  const valid =
    Boolean(input.routerBinding) &&
    input.routerBinding.status ===
      "OSAR_NET_CORE_ROUTER_BINDING_CREATED" &&
    Boolean(input.routerBinding.routerBindingReference) &&
    Boolean(input.osarGovernanceReference) &&
    Boolean(input.osarGovernanceAnchor) &&
    Boolean(input.netCoreGovernanceAnchor);

  if (!valid) {
    throw new Error(
      "INVALID_OSAR_OPERATIONAL_STATE_NET_CORE_GOVERNANCE_BINDING_INPUT",
    );
  }

  return Object.freeze({
    status:
      "OSAR_NET_CORE_GOVERNANCE_BINDING_CREATED",

    routerBindingReference:
      input.routerBinding.routerBindingReference,

    osarGovernanceReference:
      input.osarGovernanceReference,

    osarGovernanceAnchor:
      input.osarGovernanceAnchor,

    netCoreGovernanceAnchor:
      input.netCoreGovernanceAnchor,

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
  binding:
    OsarOperationalStateNetCoreGovernanceBinding,
): boolean => {
  return (
    binding.status ===
      "OSAR_NET_CORE_GOVERNANCE_BINDING_CREATED" &&
    Boolean(binding.routerBindingReference) &&
    Boolean(binding.osarGovernanceReference) &&
    Boolean(binding.osarGovernanceAnchor) &&
    Boolean(binding.netCoreGovernanceAnchor) &&
    Boolean(binding.boundAt)
  );
};
