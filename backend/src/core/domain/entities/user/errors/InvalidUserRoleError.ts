import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidUserRoleError extends ApplicationManagerError {
  constructor() {
    super('Invalid user role', ApplicationErrorCodes.INVALID_USER_ROLE);
  }
}
