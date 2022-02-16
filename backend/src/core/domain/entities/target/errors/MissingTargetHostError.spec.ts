import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingTargetHostError } from './MissingTargetHostError';

it('should be able to create a MissingTargetHostError', () => {
  const error = new MissingTargetHostError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_TARGET_HOST);
  expect(error.message).toBe('Missing target host');
});
