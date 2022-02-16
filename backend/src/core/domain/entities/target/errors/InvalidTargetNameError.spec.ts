import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidTargetNameError } from './InvalidTargetNameError';

it('should be able to create a InvalidTargetNameError', () => {
  const error = new InvalidTargetNameError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_TARGET_NAME);
  expect(error.message).toBe('Invalid target name');
});
