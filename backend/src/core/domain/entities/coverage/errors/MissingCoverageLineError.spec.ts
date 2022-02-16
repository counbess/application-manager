import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageLineError } from './MissingCoverageLineError';

it('should be able to create a MissingCoverageLineError', () => {
  const error = new MissingCoverageLineError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_LINE);
  expect(error.message).toBe('Missing coverage line');
});
