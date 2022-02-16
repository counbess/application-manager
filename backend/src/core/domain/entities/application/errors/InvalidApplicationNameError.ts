import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidApplicationNameError extends ApplicationManagerError {
  constructor() {
    super('Invalid application name', ApplicationErrorCodes.INVALID_APPLICATION_NAME);
  }
}
