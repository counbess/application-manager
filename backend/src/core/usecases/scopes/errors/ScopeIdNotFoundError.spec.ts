import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { ScopeIdNotFoundError } from './ScopeIdNotFoundError';

it('should be able to create a ScopeIdNotFoundError', () => {
  const error = new ScopeIdNotFoundError();

  expect(error.code).toBe(ApplicationErrorCodes.SCOPE_ID_NOT_FOUND);
  expect(error.message).toBe('Scope id not found');
});
