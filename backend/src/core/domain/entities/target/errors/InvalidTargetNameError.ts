import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidTargetNameError extends ApplicationManagerError {
  constructor() {
    super('Invalid target name', ApplicationErrorCodes.INVALID_TARGET_NAME);
  }
}
