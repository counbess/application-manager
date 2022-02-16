import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingApplicationNameError } from './MissingApplicationNameError';

it('should be able to create a MissingApplicationNameError', () => {
  const error = new MissingApplicationNameError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_APPLICATION_NAME);
  expect(error.message).toBe('Missing application name');
});
