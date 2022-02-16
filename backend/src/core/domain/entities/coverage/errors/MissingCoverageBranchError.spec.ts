import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageBranchError } from './MissingCoverageBranchError';

it('should be able to create a MissingCoverageBranchError', () => {
  const error = new MissingCoverageBranchError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_BRANCH);
  expect(error.message).toBe('Missing coverage branch');
});
