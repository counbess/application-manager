import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingVersionFilesCoverageError } from './MissingVersionFilesCoverageError';

it('should be create a MissingVersionFilesCoverageError', () => {
  const error = new MissingVersionFilesCoverageError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_VERSION_FILES_COVERAGE);
  expect(error.message).toBe('Missing version files coverage');
});
