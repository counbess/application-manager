import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingPermissionInUserError } from './MissingPermissionInUserError';

it('should be able to create a MissingPermissionInUserError', () => {
  const error = new MissingPermissionInUserError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_PERMISSION_IN_USER);
  expect(error.message).toBe('Missing permission in user');
});
