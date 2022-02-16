import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidCoverageItemTotalError extends ApplicationManagerError {
  constructor() {
    super('Invalid coverage item total', ApplicationErrorCodes.INVALID_COVERAGE_ITEM_TOTAL);
  }
}
