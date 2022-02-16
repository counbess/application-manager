import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidTargetPortError extends ApplicationManagerError {
  constructor() {
    super('Invalid target port', ApplicationErrorCodes.INVALID_TARGET_PORT);
  }
}
