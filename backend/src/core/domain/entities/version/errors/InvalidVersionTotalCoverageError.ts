import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidVersionTotalCoverageError extends ApplicationManagerError {
  constructor() {
    super('Invalid version total coverage', ApplicationErrorCodes.INVALID_VERSION_TOTAL_COVERAGE);
  }
}
