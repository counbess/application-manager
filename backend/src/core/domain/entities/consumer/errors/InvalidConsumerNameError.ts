import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidConsumerNameError extends ApplicationManagerError {
  constructor() {
    super('Invalid consumer name', ApplicationErrorCodes.INVALID_CONSUMER_NAME);
  }
}
