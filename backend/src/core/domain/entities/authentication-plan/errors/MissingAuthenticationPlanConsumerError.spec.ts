import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingAuthenticationPlanConsumerError } from './MissingAuthenticationPlanConsumerError';

it('should be able to create a MissingAuthenticationPlanConsumerError', () => {
  const error = new MissingAuthenticationPlanConsumerError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_AUTHENTICATION_PLAN_CONSUMER);
  expect(error.message).toBe('Missing authentication plan consumer');
});
