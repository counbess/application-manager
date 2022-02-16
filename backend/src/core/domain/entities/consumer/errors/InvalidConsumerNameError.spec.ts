import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidConsumerNameError } from './InvalidConsumerNameError';

it('should be able to create a InvalidConsumerNameError', () => {
  const error = new InvalidConsumerNameError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_CONSUMER_NAME);
  expect(error.message).toBe('Invalid consumer name');
});
