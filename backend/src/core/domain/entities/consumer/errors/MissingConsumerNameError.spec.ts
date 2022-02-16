import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingConsumerNameError } from './MissingConsumerNameError';

it('should be able to create a MissingConsumerNameError', () => {
  const error = new MissingConsumerNameError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_CONSUMER_NAME);
  expect(error.message).toBe('Missing consumer name');
});
