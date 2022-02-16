import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidApplicationRepositoryURLError extends ApplicationManagerError {
  constructor() {
    super('Invalid application repository url', ApplicationErrorCodes.INVALID_APPLICATION_REPOSITORY_URL);
  }
}
