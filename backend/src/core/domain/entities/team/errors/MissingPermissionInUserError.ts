import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingPermissionInUserError extends ApplicationManagerError {
  constructor() {
    super('Missing permission in user', ApplicationErrorCodes.MISSING_PERMISSION_IN_USER);
  }
}
