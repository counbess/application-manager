import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingApplicationOwnerError } from './MissingApplicationOwnerError';

it('should be able to create a MissingApplicationOwnerError', () => {
  const error = new MissingApplicationOwnerError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_APPLICATION_OWNER);
  expect(error.message).toBe('Missing application owner');
});
