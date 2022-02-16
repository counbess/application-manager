import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingUserUsernameError } from './MissingUserUsernameError';

it('should be able to create a MissingUserUsernameError', () => {
  const error = new MissingUserUsernameError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_USER_USERNAME);
  expect(error.message).toBe('Missing user username');
});
