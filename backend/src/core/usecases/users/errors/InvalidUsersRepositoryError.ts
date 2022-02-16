import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidUsersRepositoryError extends ApplicationManagerError {
  constructor() {
    super('Invalid users repository', ApplicationErrorCodes.INVALID_USERS_REPOSITORY);
  }
}
