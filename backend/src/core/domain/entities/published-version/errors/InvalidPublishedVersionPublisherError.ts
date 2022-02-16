import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidPublishedVersionPublisherError extends ApplicationManagerError {
  constructor() {
    super('Invalid published version publisher', ApplicationErrorCodes.INVALID_PUBLISHED_VERSION_PUBLISHER);
  }
}
