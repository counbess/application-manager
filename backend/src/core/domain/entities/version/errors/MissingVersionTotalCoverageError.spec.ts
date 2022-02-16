import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingVersionTotalCoverageError } from './MissingVersionTotalCoverageError';

it('should be create a MissingVersionTotalCoverageError', () => {
  const error = new MissingVersionTotalCoverageError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_VERSION_TOTAL_COVERAGE);
  expect(error.message).toBe('Missing version total coverage');
});
