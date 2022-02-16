import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { UserIdNotFoundError } from './UserIdNotFoundError';

it('should be able to create a UserIdNotFoundError', () => {
  const error = new UserIdNotFoundError();

  expect(error.code).toBe(ApplicationErrorCodes.USER_ID_NOT_FOUND);
  expect(error.message).toBe('User id not found');
});
