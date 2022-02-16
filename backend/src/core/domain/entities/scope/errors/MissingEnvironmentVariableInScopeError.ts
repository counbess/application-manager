import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingEnvironmentVariableInScopeError extends ApplicationManagerError {
  constructor() {
    super('Missing scope environment variable', ApplicationErrorCodes.SCOPE_MISSING_ENV_VARIABLE);
  }
}
