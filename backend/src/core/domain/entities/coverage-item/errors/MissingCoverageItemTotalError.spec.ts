import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingCoverageItemTotalError } from './MissingCoverageItemTotalError';

it('should be able to create a MissingCoverageItemTotalError', () => {
  const error = new MissingCoverageItemTotalError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_COVERAGE_ITEM_TOTAL);
  expect(error.message).toBe('Missing coverage item total');
});
