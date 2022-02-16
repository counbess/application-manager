import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidVersionFilesCoverageError extends ApplicationManagerError {
  constructor() {
    super('Invalid version files coverage', ApplicationErrorCodes.INVALID_VERSION_FILES_COVERAGE);
  }
}
