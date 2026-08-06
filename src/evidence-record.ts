/**
 * CyberWorld-OSAR — EvidenceRecord Supporting Artifact
 * 
 * EvidenceRecord defines the bounded evidence reference
 * supporting a represented operational condition.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create operational state independently
 * - authorize actions
 * - modify world state
 *
 * Evidence reference only:
 * - preserves supporting lineage
 * - identifies supporting artifacts
 * - enables validation traceability
 */

export type EvidenceRecordStatus =
  | "EVIDENCE_REGISTERED";

export type EvidenceRecordType =
  | "EVENT"
  | "CONTRACT"
  | "POLICY"
  | "RULING"
  | "SIGNED_RECORD";

/**
 * EvidenceRecord artifact.
 *
 * Represents supporting evidence only.
 */
export interface EvidenceRecord {
  /**
   * Artifact discriminator.
   */
  readonly status: EvidenceRecordStatus;

  /**
   * Evidence reference identifier.
   */
  readonly evidenceReference: string;

  /**
   * Evidence category.
   */
  readonly evidenceType: EvidenceRecordType;

  /**
   * Source reference for evidence lineage.
   */
  readonly evidenceSource: string;

  /**
   * Evidence creation time.
   */
  readonly createdAt: string;
}

/**
 * Create EvidenceRecord artifact.
 *
 * Pure evidence registration.
 *
 * No authority.
 * No identity.
 * No ownership.
 * No state creation.
 */
export function createEvidenceRecord(input: {
  evidenceReference: string;
  evidenceType: EvidenceRecordType;
  evidenceSource: string;
  createdAt?: string;
}): EvidenceRecord {
  return Object.freeze({
    status: "EVIDENCE_REGISTERED",
    evidenceReference: input.evidenceReference,
    evidenceType: input.evidenceType,
    evidenceSource: input.evidenceSource,
    createdAt:
      input.createdAt ?? new Date().toISOString(),
  });
}

/**
 * Validate EvidenceRecord structure.
 *
 * Structural validation only.
 */
export function validateEvidenceRecord(
  evidence: EvidenceRecord,
): boolean {
  return (
    evidence.status === "EVIDENCE_REGISTERED" &&
    evidence.evidenceReference.length > 0 &&
    evidence.evidenceType.length > 0 &&
    evidence.evidenceSource.length > 0 &&
    evidence.createdAt.length > 0
  );
}
