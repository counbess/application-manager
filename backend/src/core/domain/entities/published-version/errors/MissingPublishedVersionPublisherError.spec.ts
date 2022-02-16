import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingPublishedVersionPublisherError } from './MissingPublishedVersionPublisherError';

it('should be able to create a MissingPublishedVersionPublisherError', () => {
  const error = new MissingPublishedVersionPublisherError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_PUBLISHED_VERSION_PUBLISHER);
  expect(error.message).toBe('Missing published version publisher');
});
