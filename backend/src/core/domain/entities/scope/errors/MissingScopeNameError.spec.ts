import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingScopeNameError } from './MissingScopeNameError';

it('should be able to create a MissingScopeNameError', () => {
  const error = new MissingScopeNameError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_SCOPE_NAME);
  expect(error.message).toBe('Missing scope name');
});
