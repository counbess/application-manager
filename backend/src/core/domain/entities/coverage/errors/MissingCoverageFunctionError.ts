import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingCoverageFunctionError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage function', ApplicationErrorCodes.MISSING_COVERAGE_FUNCTION);
  }
}
