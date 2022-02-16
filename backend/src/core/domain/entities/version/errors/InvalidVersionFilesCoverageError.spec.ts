import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidVersionFilesCoverageError } from './InvalidVersionFilesCoverageError';

it('should be create a InvalidVersionFilesCoverageError', () => {
  const error = new InvalidVersionFilesCoverageError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_VERSION_FILES_COVERAGE);
  expect(error.message).toBe('Invalid version files coverage');
});
