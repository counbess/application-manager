import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingCoverageItemTotalError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage item total', ApplicationErrorCodes.MISSING_COVERAGE_ITEM_TOTAL);
  }
}
