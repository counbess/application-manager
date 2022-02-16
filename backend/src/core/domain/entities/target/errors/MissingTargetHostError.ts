import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingTargetHostError extends ApplicationManagerError {
  constructor() {
    super('Missing target host', ApplicationErrorCodes.MISSING_TARGET_HOST);
  }
}
