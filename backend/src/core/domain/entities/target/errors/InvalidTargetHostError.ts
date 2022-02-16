import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidTargetHostError extends ApplicationManagerError {
  constructor() {
    super('Invalid target host', ApplicationErrorCodes.INVALID_TARGET_HOST);
  }
}
