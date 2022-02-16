import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidCoverageItemCoveredError } from './InvalidCoverageItemCoveredError';

it('should be able to create a InvalidCoverageItemCoveredError', () => {
  const error = new InvalidCoverageItemCoveredError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_COVERAGE_ITEM_COVERED);
  expect(error.message).toBe('Invalid coverage item covered');
});
