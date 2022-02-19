import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidTargetsRepositoryError extends ApplicationManagerError {
  constructor() {
    super('Invalid targets repository', ApplicationErrorCodes.INVALID_TARGETS_REPOSITORY);
  }
}
