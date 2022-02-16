import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { VersionCurrentlyAppliedInScopeError } from './VersionCurrentlyAppliedInScopeError';

it('should be able to create a VersionCurrentlyAppliedInScopeError', () => {
  const error = new VersionCurrentlyAppliedInScopeError();

  expect(error.code).toBe(ApplicationErrorCodes.VERSION_CURRENTLY_APPLIED_IN_SCOPE);
  expect(error.message).toBe('Version currently applied in the scope');
});
