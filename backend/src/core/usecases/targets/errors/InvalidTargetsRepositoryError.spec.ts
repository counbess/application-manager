import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidTargetsRepositoryError } from './InvalidTargetsRepositoryError';

it('should be able to create a InvalidTargetsRepositoryError', () => {
  const error = new InvalidTargetsRepositoryError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_TARGETS_REPOSITORY);
  expect(error.message).toBe('Invalid targets repository');
});
