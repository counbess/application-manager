import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingApplicationRepositoryURLError extends ApplicationManagerError {
  constructor() {
    super('Missing application repository url', ApplicationErrorCodes.MISSING_APPLICATION_REPOSITORY_URL);
  }
}
