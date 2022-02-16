import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidUserRoleError } from './InvalidUserRoleError';

it('should be able to create a InvalidUserRoleError', () => {
  const error = new InvalidUserRoleError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_USER_ROLE);
  expect(error.message).toBe('Invalid user role');
});
