import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingTargetsRepositoryError } from './MissingTargetsRepositoryError';

it('should be able to create a MissingTargetsRepositoryError', () => {
  const error = new MissingTargetsRepositoryError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_TARGETS_REPOSITORY);
  expect(error.message).toBe('Missing targets repository');
});
