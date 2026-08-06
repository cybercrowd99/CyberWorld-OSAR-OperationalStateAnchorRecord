/**
 * CyberWorld-OSAR — AuthorityGraph Relationship Artifact
 * 
 * AuthorityGraph defines the bounded relationship representation
 * between declared authority references inside CyberWorld-OSAR.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - expand jurisdiction
 * - grant permissions
 * - control world state
 *
 * Relationship mapping only:
 * - preserves authority lineage
 * - represents declared relationships
 * - supports authority validation
 */

import { AuthorityRef } from "./authority-ref";

export type AuthorityGraphStatus =
  | "GRAPH_REGISTERED";

export interface AuthorityRelationship {
  readonly fromAuthority:
    string;

  readonly toAuthority:
    string;

  readonly relationshipType:
    "DELEGATION"
    | "REVIEW"
    | "GOVERNANCE";
}

export interface AuthorityGraph {
  readonly status:
    AuthorityGraphStatus;

  readonly graphReference:
    string;

  readonly authorities:
    readonly AuthorityRef[];

  readonly relationships:
    readonly AuthorityRelationship[];

  readonly createdAt:
    string;
}

/**
 * Create AuthorityGraph artifact.
 *
 * Relationship registration only.
 */
export function createAuthorityGraph(input: {
  graphReference: string;
  authorities?: readonly AuthorityRef[];
  relationships?: readonly AuthorityRelationship[];
  createdAt?: string;
}): AuthorityGraph {
  return Object.freeze({
    status: "GRAPH_REGISTERED",
    graphReference:
      input.graphReference,
    authorities: Object.freeze([
      ...(input.authorities ?? []),
    ]),
    relationships: Object.freeze([
      ...(input.relationships ?? []),
    ]),
    createdAt:
      input.createdAt ??
      new Date().toISOString(),
  });
}

/**
 * Add authority relationship.
 *
 * Does not create authority.
 */
export function addAuthorityRelationship(
  graph: AuthorityGraph,
  relationship: AuthorityRelationship,
): AuthorityGraph {
  return Object.freeze({
    ...graph,
    relationships: Object.freeze([
      ...graph.relationships,
      relationship,
    ]),
  });
}

/**
 * Validate AuthorityGraph structure.
 *
 * Structural validation only.
 */
export function validateAuthorityGraph(
  graph: AuthorityGraph,
): boolean {
  return (
    graph.status === "GRAPH_REGISTERED" &&
    graph.graphReference.length > 0 &&
    Array.isArray(graph.authorities) &&
    Array.isArray(graph.relationships) &&
    graph.createdAt.length > 0
  );
}
