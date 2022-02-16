import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingCoverageLineError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage line', ApplicationErrorCodes.MISSING_COVERAGE_LINE);
  }
}
