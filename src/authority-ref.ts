/**
 * Authority Reference
 *
 * Authority reference structural identity layer.
 *
 * Purpose:
 * - represent bounded authority references
 * - preserve authority type classification
 * - maintain jurisdiction and ruleset linkage
 *
 * Does NOT:
 * - grant authority
 * - execute authority actions
 * - create identity
 * - establish ownership
 * - enforce governance rules
 * - modify permissions
 * - control external systems
 *
 * This layer provides structural authority reference representation only.
 */

export type AuthorityType =
  | "ORIGIN"
  | "GOVERNANCE"
  | "OPERATIONAL"
  | "REVIEW";

export interface AuthorityRef {
  authorityReference: string;
  authorityType: AuthorityType;
  jurisdiction: string;
  rulesetReference: string;
}

export function createAuthorityRef(input: {
  authorityReference: string;
  authorityType: AuthorityType;
  jurisdiction: string;
  rulesetReference: string;
}): AuthorityRef {
  return {
    authorityReference: input.authorityReference,
    authorityType: input.authorityType,
    jurisdiction: input.jurisdiction,
    rulesetReference: input.rulesetReference,
  };
}

export function validateAuthorityRef(
  authority: AuthorityRef,
): boolean {
  return (
    authority.authorityReference.length > 0 &&
    authority.jurisdiction.length > 0 &&
    authority.rulesetReference.length > 0
  );
}
