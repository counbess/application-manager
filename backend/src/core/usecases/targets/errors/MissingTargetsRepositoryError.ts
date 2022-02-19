import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingTargetsRepositoryError extends ApplicationManagerError {
  constructor() {
    super('Missing targets repository', ApplicationErrorCodes.MISSING_TARGETS_REPOSITORY);
  }
}
