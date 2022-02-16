import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingTargetTypeError } from './MissingTargetTypeError';

it('should be able to create a MissingTargetTypeError', () => {
  const error = new MissingTargetTypeError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_TARGET_TYPE);
  expect(error.message).toBe('Missing target type');
});
