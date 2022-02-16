import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingAuthenticationPlanKeyError extends ApplicationManagerError {
  constructor() {
    super('Missing authentication plan key', ApplicationErrorCodes.MISSING_AUTHENTICATION_PLAN_KEY);
  }
}
