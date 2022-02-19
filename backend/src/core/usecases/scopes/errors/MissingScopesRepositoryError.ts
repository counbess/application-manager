import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingScopesRepositoryError extends ApplicationManagerError {
  constructor() {
    super('Missing scope repository', ApplicationErrorCodes.MISSING_SCOPES_REPOSITORY);
  }
}
