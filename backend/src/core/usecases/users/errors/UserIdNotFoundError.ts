import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class UserIdNotFoundError extends ApplicationManagerError {
  constructor() {
    super('User id not found', ApplicationErrorCodes.USER_ID_NOT_FOUND);
  }
}
