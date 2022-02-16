import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { DuplicateEnvironmentVariableInScopeError } from './DuplicateEnvironmentVariableInScopeError';

it('should be able to create a DuplicateEnvironmentVariableInScopeError', () => {
  const error = new DuplicateEnvironmentVariableInScopeError();

  expect(error.code).toBe(ApplicationErrorCodes.SCOPE_DUPLICATE_ENV_VARIABLE);
  expect(error.message).toBe('Duplicate scope environment variable');
});
