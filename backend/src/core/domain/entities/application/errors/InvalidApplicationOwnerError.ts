import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidApplicationOwnerError extends ApplicationManagerError {
  constructor() {
    super('Invalid application owner', ApplicationErrorCodes.INVALID_APPLICATION_OWNER);
  }
}
