import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidEnvironmentVariableFormatInScopeError } from './InvalidEnvironmentVariableFormatInScopeError';

it('should be able to create a InvalidEnvironmentVariableFormatInScopeError', () => {
  const error = new InvalidEnvironmentVariableFormatInScopeError();

  expect(error.code).toBe(ApplicationErrorCodes.SCOPE_INVALID_ENV_VARIABLE_FORMAT);
  expect(error.message).toBe('Invalid scope environment variable format');
});
