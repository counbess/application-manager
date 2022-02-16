import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidTargetTypeError extends ApplicationManagerError {
  constructor() {
    super('Invalid target type', ApplicationErrorCodes.INVALID_TARGET_TYPE);
  }
}
