import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidAuthenticationPlanConsumerError } from './InvalidAuthenticationPlanConsumerError';

it('should be able to create a InvalidAuthenticationPlanConsumerError', () => {
  const error = new InvalidAuthenticationPlanConsumerError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_AUTHENTICATION_PLAN_CONSUMER);
  expect(error.message).toBe('Invalid authentication plan consumer');
});
