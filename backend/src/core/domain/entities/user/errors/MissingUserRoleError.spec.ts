import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingUserRoleError } from './MissingUserRoleError';

it('should be able to create a MissingUserRoleError', () => {
  const error = new MissingUserRoleError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_USER_ROLE);
  expect(error.message).toBe('Missing user role');
});
