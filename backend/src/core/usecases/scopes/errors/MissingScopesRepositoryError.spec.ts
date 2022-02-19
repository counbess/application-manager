import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { MissingScopesRepositoryError } from './MissingScopesRepositoryError';

it('should be able to create a MissingScopesRepositoryError', () => {
  const error = new MissingScopesRepositoryError();

  expect(error.code).toBe(ApplicationErrorCodes.MISSING_SCOPES_REPOSITORY);
  expect(error.message).toBe('Missing scope repository');
});
