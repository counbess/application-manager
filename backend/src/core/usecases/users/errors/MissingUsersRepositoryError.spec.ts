import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingUsersRepositoryError } from './MissingUsersRepositoryError';

it('should be able to create a MissingUsersRepositoryError', () => {
  const error = new MissingUsersRepositoryError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_USERS_REPOSITORY);
  expect(error.message).toBe('Missing users repository');
});
