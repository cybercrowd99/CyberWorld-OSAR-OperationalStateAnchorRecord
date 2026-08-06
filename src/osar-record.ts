/**
 * CyberWorld-OSAR
 *
 * Operational State Anchor Record.
 *
 * Purpose:
 * - represent bounded operational state records
 * - preserve authority, evidence, scope, and lifecycle references
 * - maintain linkage between records and OSAR anchors
 *
 * Does NOT:
 * - execute operational actions
 * - create authority
 * - establish ownership
 * - modify anchor state
 * - validate external systems
 * - expose protected artifact contents
 * - control lifecycle enforcement
 *
 * OSAR record handling is structural record representation only.
 */

import { OSARAnchor } from "./osar-anchor";

export interface OSARRecord {
  recordId: string;
  operationalCondition: string;
  authorityReference: string;
  evidenceReferences: string[];
  scope: string;
  lifecycle: OSARAnchor["lifecycle"];
  createdAt: string;
  expiresAt: string;
  anchorReference?: string;
}

export function createOSARRecord(input: {
  recordId: string;
  operationalCondition: string;
  authorityReference: string;
  evidenceReferences?: string[];
  scope: string;
  anchor?: OSARAnchor;
}): OSARRecord {
  return {
    recordId: input.recordId,
    operationalCondition: input.operationalCondition,
    authorityReference: input.authorityReference,
    evidenceReferences: input.evidenceReferences ?? [],
    scope: input.scope,
    lifecycle: input.anchor?.lifecycle ?? "DEPLOYED",
    createdAt: input.anchor?.createdAt ?? new Date().toISOString(),
    expiresAt:
      input.anchor?.expiresAt ??
      new Date(Date.now() + 86400000).toISOString(),
    anchorReference: input.anchor?.anchorId,
  };
}

export function attachAnchor(
  record: OSARRecord,
  anchor: OSARAnchor,
): OSARRecord {
  return {
    ...record,
    anchorReference: anchor.anchorId,
    lifecycle: anchor.lifecycle,
    createdAt: anchor.createdAt,
    expiresAt: anchor.expiresAt,
  };
}
