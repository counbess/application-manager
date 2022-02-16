import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidAuthenticationPlanKeyError } from './InvalidAuthenticationPlanKeyError';

it('should be able to create a InvalidAuthenticationPlanKeyError', () => {
  const error = new InvalidAuthenticationPlanKeyError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_AUTHENTICATION_PLAN_KEY);
  expect(error.message).toBe('Invalid authentication plan key');
});
