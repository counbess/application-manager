import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingPublishedVersionPublisherError extends ApplicationManagerError {
  constructor() {
    super('Missing published version publisher', ApplicationErrorCodes.MISSING_PUBLISHED_VERSION_PUBLISHER);
  }
}
