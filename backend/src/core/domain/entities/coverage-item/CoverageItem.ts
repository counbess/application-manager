import { InvalidCoverageItemSkippedError } from './errors/InvalidCoverageItemSkippedError';
import { MissingCoverageItemSkippedError } from './errors/MissingCoverageItemSkippedError';
import { InvalidCoverageItemCoveredError } from './errors/InvalidCoverageItemCoveredError';
import { MissingCoverageItemCoveredError } from './errors/MissingCoverageItemCoveredError';
import { InvalidCoverageItemTotalError } from './errors/InvalidCoverageItemTotalError';
import { MissingCoverageItemTotalError } from './errors/MissingCoverageItemTotalError';

export class CoverageItem {
  readonly percent: number;

  constructor(
    readonly total: number,
    readonly covered: number,
    readonly skipped: number,
  ) {
    if (!total && total !== 0) {
      throw new MissingCoverageItemTotalError();
    } else if (typeof total !== 'number' || total < 0) {
      throw new InvalidCoverageItemTotalError();
    }

    if (!covered && covered !== 0) {
      throw new MissingCoverageItemCoveredError();
    } else if (typeof covered !== 'number' || covered < 0) {
      throw new InvalidCoverageItemCoveredError();
    }

    if (!skipped && skipped !== 0) {
      throw new MissingCoverageItemSkippedError();
    } else if (typeof skipped !== 'number' || skipped < 0) {
      throw new InvalidCoverageItemSkippedError();
    }

    if (covered > total) {
      throw new InvalidCoverageItemCoveredError();
    }

    if (skipped > total) {
      throw new InvalidCoverageItemSkippedError();
    }

    if (covered + skipped !== total) {
      throw new InvalidCoverageItemTotalError();
    }

    this.percent = ((covered + skipped) / total) * 100;
  }
}
