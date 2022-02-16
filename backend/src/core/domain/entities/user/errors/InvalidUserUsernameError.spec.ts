import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidUserUsernameError } from './InvalidUserUsernameError';

it('should be able to create a InvalidUserUsernameError', () => {
  const error = new InvalidUserUsernameError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_USER_USERNAME);
  expect(error.message).toBe('Invalid user username');
});
