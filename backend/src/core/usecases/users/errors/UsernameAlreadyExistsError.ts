import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class UsernameAlreadyExistsError extends ApplicationManagerError {
  constructor() {
    super('Username already exists', ApplicationErrorCodes.USERNAME_ALREADY_EXISTS);
  }
}
