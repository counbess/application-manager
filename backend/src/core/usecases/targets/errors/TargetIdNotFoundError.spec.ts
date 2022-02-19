import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { TargetIdNotFoundError } from './TargetIdNotFoundError';

it('should be able to create a TargetIdNotFoundError', () => {
  const error = new TargetIdNotFoundError();

  expect(error.code).toBe(ApplicationErrorCodes.TARGET_ID_NOT_FOUND);
  expect(error.message).toBe('Target id not found');
});
