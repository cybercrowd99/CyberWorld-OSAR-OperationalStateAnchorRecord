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
