import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidPublishedVersionPublishTypeError extends ApplicationManagerError {
  constructor() {
    super('Invalid published version publish type', ApplicationErrorCodes.INVALID_PUBLISHED_VERSION_PUBLISH_TYPE);
  }
}
