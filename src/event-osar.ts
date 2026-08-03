/**
 * CyberWorld-OSAR — EventOSAR Origin Artifact
 *
 * EventOSAR defines the bounded origin reference
 * responsible for producing a represented operational condition.
 *
 * It does not:
 * - create authority
 * - create identity
 * - create ownership
 * - create lifecycle
 * - authorize actions
 * - modify world state
 *
 * Origin reference only:
 * - preserves event lineage
 * - identifies originating event
 * - supports evidence traceability
 */

export type EventOSARStatus =
  | "EVENT_REGISTERED";

export interface EventOSAR {
  /**
   * Artifact discriminator.
   */
  readonly status: EventOSARStatus;

  /**
   * Origin event reference.
   */
  readonly eventReference: string;

  /**
   * Declared event category.
   */
  readonly eventType: string;

  /**
   * Source reference for origin tracking.
   */
  readonly eventSource: string;

  /**
   * Event occurrence time.
   */
  readonly occurredAt: string;
}

/**
 * Create EventOSAR origin artifact.
 *
 * Pure origin registration.
 *
 * No authority.
 * No identity.
 * No ownership.
 * No state mutation.
 */
export function createEventOSAR(input: {
  eventReference: string;
  eventType: string;
  eventSource: string;
  occurredAt?: string;
}): EventOSAR {
  return Object.freeze({
    status: "EVENT_REGISTERED",
    eventReference: input.eventReference,
    eventType: input.eventType,
    eventSource: input.eventSource,
    occurredAt:
      input.occurredAt ?? new Date().toISOString(),
  });
}

/**
 * Validate EventOSAR structure.
 *
 * Structural validation only.
 */
export function validateEventOSAR(
  event: EventOSAR,
): boolean {
  return (
    event.status === "EVENT_REGISTERED" &&
    event.eventReference.length > 0 &&
    event.eventType.length > 0 &&
    event.eventSource.length > 0 &&
    event.occurredAt.length > 0
  );
}
