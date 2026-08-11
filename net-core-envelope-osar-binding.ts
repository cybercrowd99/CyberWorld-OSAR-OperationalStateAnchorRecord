/**
 * CyberCrowd — Net Core Envelope → OSAR Binding V1
 *
 * ONE JOB:
 * Bind the declared NET→CORE envelope into the OSAR structural
 * recognition boundary through immutable OSAR-side anchors.
 *
 * Structural anchors only.
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
  NetCoreEnvelope,
} from "./net-core-envelope";

export type NetCoreEnvelopeOsarBindingStatus =
  | "OSAR_BINDING_CREATED"
  | "OSAR_BINDING_INVALID";

export interface NetCoreEnvelopeOsarBinding {
  readonly status: NetCoreEnvelopeOsarBindingStatus;
  readonly envelopeReference: string;
  readonly osarDomainAnchor: string;
  readonly osarIdentitySpine: string;
  readonly osarProvenanceAnchor: string;
  readonly osarLineageSpine: string;
  readonly osarCompletionLedgerReference: string;
  readonly osarOrganSealRegistry: string;
  readonly osarSovereignEnvelopeAnchor: string;
  readonly boundAt: string;
}

export interface CreateNetCoreEnvelopeOsarBindingInput {
  readonly envelope: NetCoreEnvelope;
  readonly osarDomainAnchor: string;
  readonly osarIdentitySpine: string;
  readonly osarProvenanceAnchor: string;
  readonly osarLineageSpine: string;
  readonly osarCompletionLedgerReference: string;
  readonly osarOrganSealRegistry: string;
  readonly osarSovereignEnvelopeAnchor: string;
}

/**
 * Creates the immutable OSAR-side structural binding for
 * a declared NET→CORE envelope.
 *
 * Structural binding only.
 */
export const createNetCoreEnvelopeOsarBinding = (
  input: CreateNetCoreEnvelopeOsarBindingInput,
): NetCoreEnvelopeOsarBinding => {
  const valid =
    Boolean(input.envelope) &&
    input.envelope.status === "NET_CORE_ENVELOPE_CREATED" &&
    Boolean(input.envelope.envelopeReference) &&
    Boolean(input.osarDomainAnchor) &&
    Boolean(input.osarIdentitySpine) &&
    Boolean(input.osarProvenanceAnchor) &&
    Boolean(input.osarLineageSpine) &&
    Boolean(input.osarCompletionLedgerReference) &&
    Boolean(input.osarOrganSealRegistry) &&
    Boolean(input.osarSovereignEnvelopeAnchor);

  if (!valid) {
    throw new Error(
      "INVALID_NET_CORE_ENVELOPE_OSAR_BINDING_INPUT",
    );
  }

  return Object.freeze({
    status: "OSAR_BINDING_CREATED",

    envelopeReference:
      input.envelope.envelopeReference,

    osarDomainAnchor:
      input.osarDomainAnchor,

    osarIdentitySpine:
      input.osarIdentitySpine,

    osarProvenanceAnchor:
      input.osarProvenanceAnchor,

    osarLineageSpine:
      input.osarLineageSpine,

    osarCompletionLedgerReference:
      input.osarCompletionLedgerReference,

    osarOrganSealRegistry:
      input.osarOrganSealRegistry,

    osarSovereignEnvelopeAnchor:
      input.osarSovereignEnvelopeAnchor,

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
export const validateNetCoreEnvelopeOsarBinding = (
  binding: NetCoreEnvelopeOsarBinding,
): boolean => {
  return (
    binding.status === "OSAR_BINDING_CREATED" &&
    Boolean(binding.envelopeReference) &&
    Boolean(binding.osarDomainAnchor) &&
    Boolean(binding.osarIdentitySpine) &&
    Boolean(binding.osarProvenanceAnchor) &&
    Boolean(binding.osarLineageSpine) &&
    Boolean(binding.osarCompletionLedgerReference) &&
    Boolean(binding.osarOrganSealRegistry) &&
    Boolean(binding.osarSovereignEnvelopeAnchor) &&
    Boolean(binding.boundAt)
  );
};
