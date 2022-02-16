import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidAuthenticationPlanKeyError extends ApplicationManagerError {
  constructor() {
    super('Invalid authentication plan key', ApplicationErrorCodes.INVALID_AUTHENTICATION_PLAN_KEY);
  }
}
