import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidCoverageItemSkippedError } from './InvalidCoverageItemSkippedError';

it('should be able to create a InvalidCoverageItemSkippedError', () => {
  const error = new InvalidCoverageItemSkippedError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_COVERAGE_ITEM_SKIPPED);
  expect(error.message).toBe('Invalid coverage item skipped');
});
