import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageStatementError } from './MissingCoverageStatementError';

it('should be able to create a MissingCoverageStatementError', () => {
  const error = new MissingCoverageStatementError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_STATEMENT);
  expect(error.message).toBe('Missing coverage statement');
});
