import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidAuthenticationPlanConsumerError extends ApplicationManagerError {
  constructor() {
    super('Invalid authentication plan consumer', ApplicationErrorCodes.INVALID_AUTHENTICATION_PLAN_CONSUMER);
  }
}
