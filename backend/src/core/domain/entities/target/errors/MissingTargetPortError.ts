import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingTargetPortError extends ApplicationManagerError {
  constructor() {
    super('Missing target port', ApplicationErrorCodes.MISSING_TARGET_PORT);
  }
}
