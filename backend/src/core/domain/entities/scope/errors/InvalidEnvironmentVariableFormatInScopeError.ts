import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidEnvironmentVariableFormatInScopeError extends ApplicationManagerError {
  constructor() {
    super('Invalid scope environment variable format', ApplicationErrorCodes.SCOPE_INVALID_ENV_VARIABLE_FORMAT);
  }
}
