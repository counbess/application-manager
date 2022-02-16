import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class PermissionAlreadyAddedToUserError extends ApplicationManagerError {
  constructor() {
    super('Permission already added to user', ApplicationErrorCodes.PERMISSION_ALREADY_ADDED_TO_USER);
  }
}
