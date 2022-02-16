import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingVersionTotalCoverageError extends ApplicationManagerError {
  constructor() {
    super('Missing version total coverage', ApplicationErrorCodes.MISSING_VERSION_TOTAL_COVERAGE);
  }
}
