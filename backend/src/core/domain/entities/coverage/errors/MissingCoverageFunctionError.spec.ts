import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageFunctionError } from './MissingCoverageFunctionError';

it('should be able to create a MissingCoverageFunctionError', () => {
  const error = new MissingCoverageFunctionError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_FUNCTION);
  expect(error.message).toBe('Missing coverage function');
});
