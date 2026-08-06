/**
 * CyberWorld Ephemeral Session Channel
 * 
 * Purpose:
 * - define a temporary communication channel boundary
 * - connect an active ephemeral session to a short-lived exchange path
 * - preserve channel existence without preserving channel history
 *
 * Does NOT:
 * - store messages
 * - store content payloads
 * - create identity
 * - track behavior
 * - create relationships
 * - authorize future actions
 * - persist communication history
 */


export type EphemeralChannelState =
  | "OPEN"
  | "CLOSED"
  | "DISSOLVED";


export type EphemeralChannelDecision =
  | "VALID"
  | "REVIEW";


export interface EphemeralSessionChannel {

  readonly status:
    "EPHEMERAL_SESSION_CHANNEL_RECORDED";

  /**
   * Temporary channel reference.
   */
  readonly channelReference: string;

  /**
   * Parent ephemeral session reference.
   */
  readonly sessionReference: string;

  /**
   * Temporary transport key anchor.
   */
  readonly channelKeyReference: string;

  readonly state:
    EphemeralChannelState;

  readonly expiresAt: number;

  readonly createdAt: number;
}


export interface CreateEphemeralChannelRequest {

  readonly sessionReference: string;

  readonly channelKeyReference: string;

  readonly ttl: number;
}


/**
 * Creates a temporary session channel.
 *
 * Structural representation only.
 */
export const createEphemeralSessionChannel = (
  request: CreateEphemeralChannelRequest,
): EphemeralSessionChannel => {

  const valid =
    Boolean(request.sessionReference) &&
    Boolean(request.channelKeyReference) &&
    Number.isFinite(request.ttl) &&
    request.ttl > 0;


  if (!valid) {
    throw new Error(
      "INVALID_EPHEMERAL_SESSION_CHANNEL_REQUEST"
    );
  }


  const now = Date.now();


  return Object.freeze({

    status:
      "EPHEMERAL_SESSION_CHANNEL_RECORDED",

    channelReference:
      `channel:${crypto.randomUUID()}`,

    sessionReference:
      request.sessionReference,

    channelKeyReference:
      request.channelKeyReference,

    state:
      "OPEN",

    expiresAt:
      now + request.ttl,

    createdAt:
      now,

  });
};


/**
 * Passive channel validation.
 *
 * Does not inspect communication.
 */
export const evaluateEphemeralSessionChannel = (
  channel: EphemeralSessionChannel,
  currentTime: number = Date.now(),
): EphemeralChannelDecision => {

  if (
    channel.state !== "OPEN" ||
    currentTime >= channel.expiresAt
  ) {
    return "REVIEW";
  }


  return "VALID";
};


/**
 * Closes channel availability.
 */
export const closeEphemeralSessionChannel = (
  channel: EphemeralSessionChannel,
): EphemeralSessionChannel => {

  return Object.freeze({

    ...channel,

    state:
      "CLOSED",

  });
};


/**
 * Dissolves channel boundary.
 *
 * No communication residue retained.
 */
export const dissolveEphemeralSessionChannel = (
  channel: EphemeralSessionChannel,
): EphemeralSessionChannel => {

  return Object.freeze({

    ...channel,

    state:
      "DISSOLVED",

  });
};


/**
 * Structural validation only.
 */
export const validateEphemeralSessionChannel = (
  channel: EphemeralSessionChannel,
): boolean => {

  return (

    channel.status ===
      "EPHEMERAL_SESSION_CHANNEL_RECORDED" &&

    Boolean(channel.channelReference) &&

    Boolean(channel.sessionReference) &&

    Boolean(channel.channelKeyReference) &&

    Number.isFinite(channel.expiresAt) &&

    Number.isFinite(channel.createdAt)

  );
};
