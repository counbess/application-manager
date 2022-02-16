import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingTargetNameError extends ApplicationManagerError {
  constructor() {
    super('Missing target name', ApplicationErrorCodes.MISSING_TARGET_NAME);
  }
}
