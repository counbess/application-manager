import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingTargetTypeError extends ApplicationManagerError {
  constructor() {
    super('Missing target type', ApplicationErrorCodes.MISSING_TARGET_TYPE);
  }
}
