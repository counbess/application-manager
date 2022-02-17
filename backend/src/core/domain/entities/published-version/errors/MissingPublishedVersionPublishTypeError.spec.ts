import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingPublishedVersionPublishTypeError } from './MissingPublishedVersionPublishTypeError';

it('should be able to create a MissingPublishedVersionPublishTypeError', () => {
  const error = new MissingPublishedVersionPublishTypeError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_PUBLISHED_VERSION_PUBLISH_TYPE);
  expect(error.message).toBe('Missing published version publish type');
});
