import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidConsumerDescriptionError } from './InvalidConsumerDescriptionError';

it('should be able to create a InvalidConsumerDescriptionError', () => {
  const error = new InvalidConsumerDescriptionError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_CONSUMER_DESCRIPTION);
  expect(error.message).toBe('Invalid consumer description');
});
