import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidApplicationOwnerError } from './InvalidApplicationOwnerError';

it('should be able to create a InvalidApplicationOwnerError', () => {
  const error = new InvalidApplicationOwnerError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_APPLICATION_OWNER);
  expect(error.message).toBe('Invalid application owner');
});
