import semver from 'semver';

import { InvalidVersionNumberFormatError } from './errors/InvalidVersionNumberFormatError';
import { InvalidVersionNumberError } from './errors/InvalidVersionNumberError';
import { MissingVersionNumberError } from './errors/MissingVersionNumberError';
import { MissingVersionTotalCoverageError } from './errors/MissingVersionTotalCoverageError';
import { InvalidVersionTotalCoverageError } from './errors/InvalidVersionTotalCoverageError';
import { MissingVersionFilesCoverageError } from './errors/MissingVersionFilesCoverageError';
import { InvalidVersionFilesCoverageError } from './errors/InvalidVersionFilesCoverageError';
import { Coverage } from '../coverage/Coverage';

export class Version {
  constructor(
    readonly number: string,
    readonly totalCoverage: Coverage,
    readonly filesCoverage: Map<string, Coverage>,
  ) {
    if (!number) {
      throw new MissingVersionNumberError();
    } else if (typeof number !== 'string') {
      throw new InvalidVersionNumberError();
    }

    if (!totalCoverage) {
      throw new MissingVersionTotalCoverageError();
    } else if (!(totalCoverage instanceof Coverage)) {
      throw new InvalidVersionTotalCoverageError();
    }

    if (!filesCoverage) {
      throw new MissingVersionFilesCoverageError();
    } else if (!(filesCoverage instanceof Map)) {
      throw new InvalidVersionFilesCoverageError();
    } else if (filesCoverage.size > 0) {
      filesCoverage.forEach((fileCoverage) => {
        if (!(fileCoverage instanceof Coverage)) {
          throw new InvalidVersionFilesCoverageError();
        }
      });
    }

    if (!semver.valid(number)) {
      throw new InvalidVersionNumberFormatError();
    }
  }
}
