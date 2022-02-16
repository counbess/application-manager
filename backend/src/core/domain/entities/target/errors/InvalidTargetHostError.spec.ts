import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidTargetHostError } from './InvalidTargetHostError';

it('should be able to create a InvalidTargetHostError', () => {
  const error = new InvalidTargetHostError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_TARGET_HOST);
  expect(error.message).toBe('Invalid target host');
});
