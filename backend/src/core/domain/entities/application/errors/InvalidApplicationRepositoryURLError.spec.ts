import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidApplicationRepositoryURLError } from './InvalidApplicationRepositoryURLError';

it('should be able to create a InvalidApplicationRepositoryURLError', () => {
  const error = new InvalidApplicationRepositoryURLError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_APPLICATION_REPOSITORY_URL);
  expect(error.message).toBe('Invalid application repository url');
});
