import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingEnvironmentVariableInScopeError } from './MissingEnvironmentVariableInScopeError';

it('should be able to create a MissingEnvironmentVariableInScopeError', () => {
  const error = new MissingEnvironmentVariableInScopeError();

  expect(error.code).toBe(ApplicationErrorCodes.SCOPE_MISSING_ENV_VARIABLE);
  expect(error.message).toBe('Missing scope environment variable');
});
