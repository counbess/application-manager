import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidScopeTargetError } from './InvalidScopeTargetError';

it('should be able to create a InvalidScopeTargetError', () => {
  const error = new InvalidScopeTargetError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_SCOPE_TARGET);
  expect(error.message).toBe('Invalid scope target');
});
