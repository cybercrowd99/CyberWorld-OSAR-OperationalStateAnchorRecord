/**
 * CyberWorld Sovereign Presence Protocol
 *
 * Purpose:
 * - enable discoverability without identity capture
 * - expose temporary capability presence
 * - create ephemeral interaction boundaries
 *
 * Does NOT:
 * - create identity records
 * - store behavior
 * - track history
 * - create ownership
 * - persist relationships
 * - authorize future actions
 */


export type PresenceState =
  | "AVAILABLE"
  | "ENGAGED"
  | "DISSOLVED";


export type PresenceDecision =
  | "DISCOVERABLE"
  | "REVIEW";


export interface SovereignPresence {

  readonly status:
    "SOVEREIGN_PRESENCE_RECORDED";

  /**
   * Temporary presence reference.
   * Not a user identity.
   */
  readonly presenceReference: string;

  /**
   * Capability signal only.
   */
  readonly capabilityReference: string;

  /**
   * Ephemeral public key reference.
   */
  readonly sessionKeyReference: string;

  readonly state: PresenceState;

  readonly expiresAt: number;

  readonly createdAt: number;
}


export interface PresenceRequest {

  readonly capabilityReference: string;

  readonly sessionKeyReference: string;

  readonly ttl: number;
}


/**
 * Creates temporary discoverability.
 *
 * Presence exists only inside its validity window.
 */
export const createSovereignPresence = (
  input: PresenceRequest,
): SovereignPresence => {

  const valid =
    Boolean(input.capabilityReference) &&
    Boolean(input.sessionKeyReference) &&
    Number.isFinite(input.ttl) &&
    input.ttl > 0;


  if (!valid) {
    throw new Error(
      "INVALID_SOVEREIGN_PRESENCE_REQUEST"
    );
  }


  return Object.freeze({

    status:
      "SOVEREIGN_PRESENCE_RECORDED",

    presenceReference:
      `presence:${crypto.randomUUID()}`,

    capabilityReference:
      input.capabilityReference,

    sessionKeyReference:
      input.sessionKeyReference,

    state:
      "AVAILABLE",

    expiresAt:
      Date.now() + input.ttl,

    createdAt:
      Date.now(),
  });
};


/**
 * Discovery check only.
 *
 * Does not reveal identity.
 */
export const evaluatePresence = (
  presence: SovereignPresence,
  currentTime: number = Date.now(),
): PresenceDecision => {

  if (
    presence.state === "DISSOLVED" ||
    currentTime >= presence.expiresAt
  ) {
    return "REVIEW";
  }

  return "DISCOVERABLE";
};


/**
 * Ends presence.
 *
 * Does not delete identity because identity
 * was never stored here.
 */
export const dissolvePresence = (
  presence: SovereignPresence,
): SovereignPresence => {

  return Object.freeze({

    ...presence,

    state:
      "DISSOLVED",

  });
};


/**
 * Structural validation only.
 */
export const validateSovereignPresence = (
  presence: SovereignPresence,
): boolean => {

  return (

    presence.status ===
      "SOVEREIGN_PRESENCE_RECORDED" &&

    Boolean(presence.presenceReference) &&

    Boolean(presence.capabilityReference) &&

    Boolean(presence.sessionKeyReference) &&

    Number.isFinite(presence.expiresAt) &&

    Number.isFinite(presence.createdAt)

  );
};
