import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidPublishedVersionPublishTypeError } from './InvalidPublishedVersionPublishTypeError';

it('should be able to create a InvalidPublishedVersionPublishTypeError', () => {
  const error = new InvalidPublishedVersionPublishTypeError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_PUBLISHED_VERSION_PUBLISH_TYPE);
  expect(error.message).toBe('Invalid published version publish type');
});
