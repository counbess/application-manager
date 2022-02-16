import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidCoverageItemCoveredError extends ApplicationManagerError {
  constructor() {
    super('Invalid coverage item covered', ApplicationErrorCodes.INVALID_COVERAGE_ITEM_COVERED);
  }
}
