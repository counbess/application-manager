import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingScopeTargetError } from './MissingScopeTargetError';

it('should be able to create a MissingScopeTargetError', () => {
  const error = new MissingScopeTargetError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_SCOPE_TARGET);
  expect(error.message).toBe('Missing scope target');
});
