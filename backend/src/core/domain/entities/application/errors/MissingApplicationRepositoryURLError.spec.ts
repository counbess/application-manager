import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingApplicationRepositoryURLError } from './MissingApplicationRepositoryURLError';

it('should be able to create a MissingApplicationRepositoryURLError', () => {
  const error = new MissingApplicationRepositoryURLError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_APPLICATION_REPOSITORY_URL);
  expect(error.message).toBe('Missing application repository url');
});
