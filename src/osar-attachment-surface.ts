/**
 * OSAR — Attachment Surface
 *
 * ONE JOB:
 * Structurally accept an existing OSAR doctrine artifact.
 *
 * This surface does not:
 * - interpret the artifact
 * - extract meaning
 * - process governance
 * - route governance
 * - execute behavior
 * - contact external services
 * - create authority
 * - mutate the supplied artifact
 */

export interface OSARDoctrineArtifact {
  readonly type: string;
  readonly version: string;
}

export interface OSARAttachment {
  readonly attached: true;
  readonly attachedAt: string;
  readonly artifact: OSARDoctrineArtifact;
}

export const attachOSARArtifact = (
  artifact: OSARDoctrineArtifact,
): OSARAttachment | null => {
  if (
    artifact === null ||
    typeof artifact !== "object" ||
    typeof artifact.type !== "string" ||
    artifact.type.trim().length === 0 ||
    typeof artifact.version !== "string" ||
    artifact.version.trim().length === 0
  ) {
    return null;
  }

  return Object.freeze({
    attached: true as const,
    attachedAt: new Date().toISOString(),
    artifact,
  });
};
