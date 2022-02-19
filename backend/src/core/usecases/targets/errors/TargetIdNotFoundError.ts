import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class TargetIdNotFoundError extends ApplicationManagerError {
  constructor() {
    super('Target id not found', ApplicationErrorCodes.TARGET_ID_NOT_FOUND);
  }
}
