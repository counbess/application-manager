import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidScopeNameError } from './InvalidScopeNameError';

it('should be able to create a InvalidScopeNameError', () => {
  const error = new InvalidScopeNameError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_SCOPE_NAME);
  expect(error.message).toBe('Invalid scope name');
});
