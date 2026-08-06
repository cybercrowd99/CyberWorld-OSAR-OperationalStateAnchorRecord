/**
 * CyberWorld-OSAR
 * 
 * Finality Ledger
 *
 * The verified receipt of dissolution.
 *
 * Purpose:
 * - preserve proof that lifecycle closure completed
 * - maintain minimal finality reference
 * - provide immutable structural completion record
 *
 * Does NOT:
 * - store dissolved artifact contents
 * - restore artifacts
 * - resolve identity
 * - create ownership
 * - preserve behavior history
 * - store financial meaning
 * - execute deletion
 *
 * Finality is lifecycle proof only.
 */


export type FinalityStatus =
  | "SUCCESS"
  | "AUDIT_REQUIRED";


export const FINALITY_LEDGER_STATUS =
  "FINALITY_LEDGER_ENTRY_RECORDED" as const;


export interface FinalityEntry {

  readonly status:
    typeof FINALITY_LEDGER_STATUS;

  readonly artifactReference: string;

  readonly closureWitnessReference: string;

  readonly verificationReference: string;

  readonly verificationStatus:
    FinalityStatus;

  readonly finalityReference: string;

  readonly createdAt: number;
}


export interface FinalityLedgerInput {

  readonly artifactReference: string;

  readonly closureWitnessReference: string;

  readonly verificationReference: string;

  readonly verificationStatus:
    FinalityStatus;
}


/**
 * Creates immutable finality receipt.
 *
 * Structural recording only.
 */
export const createFinalityEntry = (
  input: FinalityLedgerInput,
): FinalityEntry => {

  const valid =
    Boolean(input.artifactReference) &&
    Boolean(input.closureWitnessReference) &&
    Boolean(input.verificationReference) &&
    input.verificationStatus === "SUCCESS";


  return Object.freeze({

    status:
      FINALITY_LEDGER_STATUS,

    artifactReference:
      input.artifactReference,

    closureWitnessReference:
      input.closureWitnessReference,

    verificationReference:
      input.verificationReference,

    verificationStatus:
      valid
        ? "SUCCESS"
        : "AUDIT_REQUIRED",

    finalityReference:
      `finality:${input.verificationReference}`,

    createdAt:
      Date.now(),
  });
};


/**
 * Structural validation only.
 */
export const validateFinalityEntry = (
  entry: FinalityEntry,
): boolean => {

  return (

    entry.status ===
      FINALITY_LEDGER_STATUS &&

    Boolean(entry.artifactReference) &&

    Boolean(entry.closureWitnessReference) &&

    Boolean(entry.verificationReference) &&

    Number.isFinite(entry.createdAt)

  );
};
