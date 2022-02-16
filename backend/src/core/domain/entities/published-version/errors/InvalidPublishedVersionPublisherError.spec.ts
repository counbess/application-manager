import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidPublishedVersionPublisherError } from './InvalidPublishedVersionPublisherError';

it('should be able to create a InvalidPublishedVersionPublisherError', () => {
  const error = new InvalidPublishedVersionPublisherError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_PUBLISHED_VERSION_PUBLISHER);
  expect(error.message).toBe('Invalid published version publisher');
});
