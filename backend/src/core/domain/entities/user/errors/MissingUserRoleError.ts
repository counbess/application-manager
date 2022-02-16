import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingUserRoleError extends ApplicationManagerError {
  constructor() {
    super('Missing user role', ApplicationErrorCodes.MISSING_USER_ROLE);
  }
}
