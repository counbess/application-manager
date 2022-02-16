import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageItemCoveredError } from './MissingCoverageItemCoveredError';

it('should be able to create a MissingCoverageItemCoveredError', () => {
  const error = new MissingCoverageItemCoveredError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_ITEM_COVERED);
  expect(error.message).toBe('Missing coverage item covered');
});
