import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingUsersRepositoryError extends ApplicationManagerError {
  constructor() {
    super('Missing users repository', ApplicationErrorCodes.MISSING_USERS_REPOSITORY);
  }
}
