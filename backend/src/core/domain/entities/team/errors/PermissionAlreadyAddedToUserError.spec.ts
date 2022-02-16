import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { PermissionAlreadyAddedToUserError } from './PermissionAlreadyAddedToUserError';

it('should be able to create PermissionAlreadyAddedToUserError', () => {
  const error = new PermissionAlreadyAddedToUserError();

  expect(error.code).toBe(ApplicationErrorCodes.PERMISSION_ALREADY_ADDED_TO_USER);
  expect(error.message).toBe('Permission already added to user');
});
