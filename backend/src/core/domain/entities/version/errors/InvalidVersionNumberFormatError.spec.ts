import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { InvalidVersionNumberFormatError } from './InvalidVersionNumberFormatError';

it('should be create a InvalidVersionNumberFormatError', () => {
  const error = new InvalidVersionNumberFormatError();

  expect(error.code).toBe(ApplicationErrorCodes.INVALID_VERSION_NUMBER_FORMAT);
  expect(error.message).toBe('Invalid version number format');
});
