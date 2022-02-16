import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidTargetPortError } from './InvalidTargetPortError';

it('should be able to create a InvalidTargetPortError', () => {
  const error = new InvalidTargetPortError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_TARGET_PORT);
  expect(error.message).toBe('Invalid target port');
});
