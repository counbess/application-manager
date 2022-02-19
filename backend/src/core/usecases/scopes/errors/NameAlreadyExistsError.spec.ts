import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { NameAlreadyExistsError } from './NameAlreadyExistsError';

it('should be able to create a NameAlreadyExistsError', () => {
  const error = new NameAlreadyExistsError();

  expect(error.code).toBe(ApplicationErrorCodes.SCOPE_NAME_ALREADY_EXISTS);
  expect(error.message).toBe('Scope name already exists');
});
