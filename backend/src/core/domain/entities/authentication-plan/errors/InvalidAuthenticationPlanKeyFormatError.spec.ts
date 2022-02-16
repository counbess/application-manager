import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidAuthenticationPlanKeyFormatError } from './InvalidAuthenticationPlanKeyFormatError';

it('should be able to create a InvalidAuthenticationPlanKeyFormatError', () => {
  const error = new InvalidAuthenticationPlanKeyFormatError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_AUTHENTICATION_PLAN_KEY_FORMAT);
  expect(error.message).toBe('Invalid authentication plan key format');
});
