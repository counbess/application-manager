import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class ScopeIdNotFoundError extends ApplicationManagerError {
  constructor() {
    super('Scope id not found', ApplicationErrorCodes.SCOPE_ID_NOT_FOUND);
  }
}
