import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidConsumerDescriptionError extends ApplicationManagerError {
  constructor() {
    super('Invalid consumer description', ApplicationErrorCodes.INVALID_CONSUMER_DESCRIPTION);
  }
}
