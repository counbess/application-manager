import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingCoverageItemSkippedError extends ApplicationManagerError {
  constructor() {
    super('Missing coverage item skipped', ApplicationErrorCodes.MISSING_COVERAGE_ITEM_SKIPPED);
  }
}
