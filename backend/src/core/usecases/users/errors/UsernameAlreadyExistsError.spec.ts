import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { UsernameAlreadyExistsError } from './UsernameAlreadyExistsError';

it('should be able to create a UsernameAlreadyExistsError', () => {
  const error = new UsernameAlreadyExistsError();

  expect(error.code).toBe(ApplicationErrorCodes.USERNAME_ALREADY_EXISTS);
  expect(error.message).toBe('Username already exists');
});
