import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidUserUsernameError extends ApplicationManagerError {
  constructor() {
    super('Invalid user username', ApplicationErrorCodes.INVALID_USER_USERNAME);
  }
}
