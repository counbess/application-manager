import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class VersionCurrentlyAppliedInScopeError extends ApplicationManagerError {
  constructor() {
    super('Version currently applied in the scope', ApplicationErrorCodes.VERSION_CURRENTLY_APPLIED_IN_SCOPE);
  }
}
