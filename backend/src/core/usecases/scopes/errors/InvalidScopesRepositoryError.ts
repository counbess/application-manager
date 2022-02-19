import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidScopesRepositoryError extends ApplicationManagerError {
  constructor() {
    super('Invalid scopes repository', ApplicationErrorCodes.INVALID_SCOPES_REPOSITORY);
  }
}
