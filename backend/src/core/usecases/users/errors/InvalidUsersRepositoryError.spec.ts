import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidUsersRepositoryError } from './InvalidUsersRepositoryError';

it('should be able to create a InvalidUsersRepositoryError', () => {
  const error = new InvalidUsersRepositoryError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_USERS_REPOSITORY);
  expect(error.message).toBe('Invalid users repository');
});
