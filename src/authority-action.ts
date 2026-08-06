/**
 * Authority Action
 *
 * Authority action structural record layer.
 *
 * Purpose:
 * - represent bounded authority action references
 * - preserve declared action type relationships
 * - validate authority action structural alignment
 *
 * Does NOT:
 * - grant authority
 * - execute authority actions
 * - modify permissions
 * - create identity
 * - establish ownership
 * - enforce external systems
 * - control policy decisions
 *
 * This layer provides structural authority action representation only.
 */

import { AuthorityRef } from "./authority-ref";

export type AuthorityActionType =
  | "DECLARE"
  | "REVIEW"
  | "RELEASE"
  | "AUDIT"
  | "APPEAL";

export interface AuthorityAction {
  actionReference: string;
  actionType: AuthorityActionType;
  authorityReference: string;
  scopeReference: string;
  rulesetReference: string;
}

export function createAuthorityAction(input: {
  actionReference: string;
  actionType: AuthorityActionType;
  authority: AuthorityRef;
  scopeReference: string;
  rulesetReference: string;
}): AuthorityAction {
  return {
    actionReference: input.actionReference,
    actionType: input.actionType,
    authorityReference: input.authority.authorityReference,
    scopeReference: input.scopeReference,
    rulesetReference: input.rulesetReference,
  };
}

export function validateAuthorityAction(
  action: AuthorityAction,
  authority: AuthorityRef,
): boolean {
  return (
    action.authorityReference === authority.authorityReference &&
    action.actionReference.length > 0 &&
    action.scopeReference.length > 0 &&
    action.rulesetReference.length > 0
  );
}
