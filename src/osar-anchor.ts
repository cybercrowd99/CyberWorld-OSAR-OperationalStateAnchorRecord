export type OSARLifecycle =
  | "DEPLOYED"
  | "UNDER_REVIEW"
  | "RELEASED"
  | "EXPIRED";

export interface OSARAnchor {
  anchorId: string;
  attachedObject: string;
  scope: string;
  authorityReference: string;
  evidenceReference: string[];
  createdAt: string;
  expiresAt: string;
  lifecycle: OSARLifecycle;
}

export function createOSARAnchor(input: {
  anchorId: string;
  attachedObject: string;
  scope: string;
  authorityReference: string;
  evidenceReference?: string[];
  expiresAt: string;
}): OSARAnchor {
  return {
    anchorId: input.anchorId,
    attachedObject: input.attachedObject,
    scope: input.scope,
    authorityReference: input.authorityReference,
    evidenceReference: input.evidenceReference ?? [],
    createdAt: new Date().toISOString(),
    expiresAt: input.expiresAt,
    lifecycle: "DEPLOYED",
  };
}

export function isAnchorExpired(anchor: OSARAnchor): boolean {
  return new Date(anchor.expiresAt).getTime() <= Date.now();
}

export function moveAnchorLifecycle(
  anchor: OSARAnchor,
  next: OSARLifecycle,
): OSARAnchor {
  const allowed: Record<OSARLifecycle, OSARLifecycle[]> = {
    DEPLOYED: ["UNDER_REVIEW", "EXPIRED"],
    UNDER_REVIEW: ["RELEASED", "EXPIRED"],
    RELEASED: ["EXPIRED"],
    EXPIRED: [],
  };

  if (!allowed[anchor.lifecycle].includes(next)) {
    throw new Error(
      `Invalid OSAR lifecycle transition: ${anchor.lifecycle} -> ${next}`,
    );
  }

  return {
    ...anchor,
    lifecycle: next,
  };
}
