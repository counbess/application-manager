import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingCoverageBranchError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage branch', ApplicationErrorCodes.MISSING_COVERAGE_BRANCH);
  }
}
