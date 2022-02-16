import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingTargetPortError } from './MissingTargetPortError';

it('should be able to create a MissingTargetPortError', () => {
  const error = new MissingTargetPortError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_TARGET_PORT);
  expect(error.message).toBe('Missing target port');
});
