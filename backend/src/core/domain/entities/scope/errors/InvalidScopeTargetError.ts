import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidScopeTargetError extends ApplicationManagerError {
  constructor() {
    super('Invalid scope target', ApplicationErrorCodes.INVALID_SCOPE_TARGET);
  }
}
