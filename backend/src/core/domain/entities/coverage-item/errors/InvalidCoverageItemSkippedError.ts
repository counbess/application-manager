import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidCoverageItemSkippedError extends ApplicationManagerError {
  constructor() {
    super('Invalid coverage item skipped', ApplicationErrorCodes.INVALID_COVERAGE_ITEM_SKIPPED);
  }
}
