import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingScopeTargetError extends ApplicationManagerError {
  constructor() {
    super('Missing scope target', ApplicationErrorCodes.MISSING_SCOPE_TARGET);
  }
}
