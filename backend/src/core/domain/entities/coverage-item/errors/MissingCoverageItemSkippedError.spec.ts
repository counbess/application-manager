import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageItemSkippedError } from './MissingCoverageItemSkippedError';

it('should be able to create a MissingCoverageItemSkippedError', () => {
  const error = new MissingCoverageItemSkippedError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_ITEM_SKIPPED);
  expect(error.message).toBe('Missing coverage item skipped');
});
