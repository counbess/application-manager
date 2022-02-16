import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingScopeNameError extends ApplicationManagerError {
  constructor() {
    super('Missing scope name', ApplicationErrorCodes.MISSING_SCOPE_NAME);
  }
}
