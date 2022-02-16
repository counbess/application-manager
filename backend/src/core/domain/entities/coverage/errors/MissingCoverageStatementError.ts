import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingCoverageStatementError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage statement', ApplicationErrorCodes.MISSING_COVERAGE_STATEMENT);
  }
}
