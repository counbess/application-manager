import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingConsumerDescriptionError extends ApplicationManagerError {
  constructor() {
    super('Missing consumer description', ApplicationErrorCodes.INVALID_CONSUMER_DESCRIPTION);
  }
}
