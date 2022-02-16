import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidAuthenticationPlanKeyFormatError extends ApplicationManagerError {
  constructor() {
    super('Invalid authentication plan key format', ApplicationErrorCodes.INVALID_AUTHENTICATION_PLAN_KEY_FORMAT);
  }
}
