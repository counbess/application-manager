import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingCoverageItemCoveredError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage item covered', ApplicationErrorCodes.MISSING_COVERAGE_ITEM_COVERED);
  }
}
