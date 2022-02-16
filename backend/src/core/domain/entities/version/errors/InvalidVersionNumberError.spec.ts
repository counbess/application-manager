import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidVersionNumberError } from './InvalidVersionNumberError';

it('should be create a InvalidVersionNumberError', () => {
  const error = new InvalidVersionNumberError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_VERSION_NUMBER);
  expect(error.message).toBe('Invalid version number');
});
