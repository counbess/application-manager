import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingAuthenticationPlanConsumerError extends ApplicationManagerError {
  constructor() {
    super('Missing authentication plan consumer', ApplicationErrorCodes.MISSING_AUTHENTICATION_PLAN_CONSUMER);
  }
}
