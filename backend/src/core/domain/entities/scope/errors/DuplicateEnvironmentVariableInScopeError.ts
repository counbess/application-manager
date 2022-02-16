import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class DuplicateEnvironmentVariableInScopeError extends ApplicationManagerError {
  constructor() {
    super('Duplicate scope environment variable', ApplicationErrorCodes.SCOPE_DUPLICATE_ENV_VARIABLE);
  }
}
