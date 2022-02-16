import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class InvalidScopeNameError extends ApplicationManagerError {
  constructor() {
    super('Invalid scope name', ApplicationErrorCodes.INVALID_SCOPE_NAME);
  }
}
