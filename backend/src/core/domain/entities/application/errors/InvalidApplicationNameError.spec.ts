import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidApplicationNameError } from './InvalidApplicationNameError';

it('should be able to create a InvalidApplicationNameError', () => {
  const error = new InvalidApplicationNameError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_APPLICATION_NAME);
  expect(error.message).toBe('Invalid application name');
});
