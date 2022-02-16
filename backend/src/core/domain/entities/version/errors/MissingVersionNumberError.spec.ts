import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingVersionNumberError } from './MissingVersionNumberError';

it('should be create a MissingVersionNumberError', () => {
  const error = new MissingVersionNumberError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_VERSION_NUMBER);
  expect(error.message).toBe('Missing version number');
});
