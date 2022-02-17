import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingPublishedVersionPublishTypeError extends ApplicationManagerError {
  constructor() {
    super('Missing published version publish type', ApplicationErrorCodes.MISSING_PUBLISHED_VERSION_PUBLISH_TYPE);
  }
}
