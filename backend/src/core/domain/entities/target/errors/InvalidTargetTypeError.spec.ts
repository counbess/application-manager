import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidTargetTypeError } from './InvalidTargetTypeError';

it('should be able to create a InvalidTargetTypeError', () => {
  const error = new InvalidTargetTypeError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_TARGET_TYPE);
  expect(error.message).toBe('Invalid target type');
});
