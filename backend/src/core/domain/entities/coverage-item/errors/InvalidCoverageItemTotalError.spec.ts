import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidCoverageItemTotalError } from './InvalidCoverageItemTotalError';

it('should be able to create a InvalidCoverageItemTotalError', () => {
  const error = new InvalidCoverageItemTotalError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_COVERAGE_ITEM_TOTAL);
  expect(error.message).toBe('Invalid coverage item total');
});
