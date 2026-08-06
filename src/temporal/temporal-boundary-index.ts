/**
 * CyberWorld-OSAR
 * 
 * Temporal Boundary Index
 *
 * Skinny lifecycle index used by blind temporal workers.
 *
 * Purpose:
 * - track artifact lifecycle expiration
 * - expose expiration state
 * - provide minimal dissolution candidates
 *
 * Does NOT:
 * - inspect artifact contents
 * - resolve identity
 * - store ownership
 * - store behavior
 * - store financial meaning
 * - execute deletion
 * - control workers
 * - control vaults
 */

export type TemporalBoundaryStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "REMOVED";


export interface TemporalBoundaryEntry {
  readonly artifactReference: string;
  readonly expiresAt: number;
  readonly status: TemporalBoundaryStatus;
}


export interface TemporalBoundaryIndex {

  /**
   * Register a lifecycle boundary.
   */
  register(
    artifactReference: string,
    ttl: number,
  ): Promise<void>;


  /**
   * Return expired lifecycle references only.
   */
  findExpired(
    currentTime?: number,
  ): Promise<readonly TemporalBoundaryEntry[]>;


  /**
   * Remove lifecycle reference after closure.
   */
  remove(
    artifactReference: string,
  ): Promise<void>;
}


/**
 * Minimal temporal index implementation.
 *
 * Storage adapter remains external.
 */
export class OSARTemporalBoundaryIndex
  implements TemporalBoundaryIndex {

  constructor(
    private readonly store: {
      put(
        key: string,
        value: TemporalBoundaryEntry,
      ): Promise<void>;

      list():
        Promise<readonly TemporalBoundaryEntry[]>;

      delete(
        key: string,
      ): Promise<void>;
    },
  ) {}


  async register(
    artifactReference: string,
    ttl: number,
  ): Promise<void> {

    const entry: TemporalBoundaryEntry = Object.freeze({
      artifactReference,
      expiresAt: Date.now() + ttl,
      status: "ACTIVE",
    });

    await this.store.put(
      artifactReference,
      entry,
    );
  }


  async findExpired(
    currentTime: number = Date.now(),
  ): Promise<readonly TemporalBoundaryEntry[]> {

    const entries =
      await this.store.list();

    return Object.freeze(
      entries.filter(
        (entry) =>
          entry.status === "ACTIVE" &&
          entry.expiresAt <= currentTime,
      ),
    );
  }


  async remove(
    artifactReference: string,
  ): Promise<void> {

    await this.store.delete(
      artifactReference,
    );
  }
}


/**
 * Structural validation only.
 */
export function validateTemporalBoundaryEntry(
  entry: TemporalBoundaryEntry,
): boolean {

  return (
    entry.artifactReference.length > 0 &&
    Number.isFinite(entry.expiresAt) &&
    (
      entry.status === "ACTIVE" ||
      entry.status === "EXPIRED" ||
      entry.status === "REMOVED"
    )
  );
}
