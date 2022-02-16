import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidVersionTotalCoverageError } from './InvalidVersionTotalCoverageError';

it('should be create a InvalidVersionTotalCoverageError', () => {
  const error = new InvalidVersionTotalCoverageError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_VERSION_TOTAL_COVERAGE);
  expect(error.message).toBe('Invalid version total coverage');
});
