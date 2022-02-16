import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingTargetNameError } from './MissingTargetNameError';

it('should be able to create a MissingTargetNameError', () => {
  const error = new MissingTargetNameError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_TARGET_NAME);
  expect(error.message).toBe('Missing target name');
});
