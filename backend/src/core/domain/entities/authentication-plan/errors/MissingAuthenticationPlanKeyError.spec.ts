import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingAuthenticationPlanKeyError } from './MissingAuthenticationPlanKeyError';

it('should be able to create a MissingAuthenticationPlanKeyError', () => {
  const error = new MissingAuthenticationPlanKeyError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_AUTHENTICATION_PLAN_KEY);
  expect(error.message).toBe('Missing authentication plan key');
});
