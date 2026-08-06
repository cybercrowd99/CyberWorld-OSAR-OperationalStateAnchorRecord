/**
 * CyberWorld-OSAR
 *
 * Anchor Lifecycle State Layer.
 *
 * Purpose:
 * - represent OSAR lifecycle state progression
 * - preserve lifecycle transition boundaries
 * - validate permitted structural state movement
 *
 * Does NOT:
 * - deploy artifacts
 * - release authority
 * - modify external systems
 * - control infrastructure
 * - restore expired states
 * - create ownership
 * - resolve identity
 *
 * Lifecycle transition validation is passive structural control only.
 */

export type OSARLifecycleState =
  | "DEPLOYED"
  | "UNDER_REVIEW"
  | "RELEASED"
  | "EXPIRED";

export interface OSARAnchorLifecycle {
  lifecycleState: OSARLifecycleState;
  createdAt: string;
  expiresAt: string;
}

const transitions: Record<
  OSARLifecycleState,
  OSARLifecycleState[]
> = {
  DEPLOYED: ["UNDER_REVIEW", "EXPIRED"],
  UNDER_REVIEW: ["RELEASED", "EXPIRED"],
  RELEASED: ["EXPIRED"],
  EXPIRED: [],
};

export function createOSARAnchorLifecycle(input: {
  createdAt: string;
  expiresAt: string;
}): OSARAnchorLifecycle {
  return {
    lifecycleState: "DEPLOYED",
    createdAt: input.createdAt,
    expiresAt: input.expiresAt,
  };
}

export function validateLifecycleTransition(
  current: OSARLifecycleState,
  next: OSARLifecycleState,
): boolean {
  return transitions[current].includes(next);
}

export function advanceLifecycle(
  lifecycle: OSARAnchorLifecycle,
  next: OSARLifecycleState,
): OSARAnchorLifecycle {
  if (!validateLifecycleTransition(
    lifecycle.lifecycleState,
    next,
  )) {
    throw new Error(
      `Invalid OSAR lifecycle transition: ${lifecycle.lifecycleState} -> ${next}`,
    );
  }

  return {
    ...lifecycle,
    lifecycleState: next,
  };
}

export function isLifecycleExpired(
  lifecycle: OSARAnchorLifecycle,
): boolean {
  return new Date(lifecycle.expiresAt).getTime() <= Date.now();
}
