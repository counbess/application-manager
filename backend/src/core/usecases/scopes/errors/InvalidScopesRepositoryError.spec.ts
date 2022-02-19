import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidScopesRepositoryError } from './InvalidScopesRepositoryError';

it('should be able to create a InvalidScopesRepositoryError', () => {
  const error = new InvalidScopesRepositoryError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_SCOPES_REPOSITORY);
  expect(error.message).toBe('Invalid scopes repository');
});
