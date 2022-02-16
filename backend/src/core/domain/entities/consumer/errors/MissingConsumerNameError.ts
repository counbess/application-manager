import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingConsumerNameError extends ApplicationManagerError {
  constructor() {
    super('Missing consumer name', ApplicationErrorCodes.MISSING_CONSUMER_NAME);
  }
}
