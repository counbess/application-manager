import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingConsumerDescriptionError } from './MissingConsumerDescriptionError';

it('should be able to create a MissingConsumerDescriptionError', () => {
  const error = new MissingConsumerDescriptionError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_CONSUMER_DESCRIPTION);
  expect(error.message).toBe('Missing consumer description');
});
