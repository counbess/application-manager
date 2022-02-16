import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingVersionFilesCoverageError extends ApplicationManagerError {
  constructor() {
    super('Missing version files coverage', ApplicationErrorCodes.MISSING_VERSION_FILES_COVERAGE);
  }
}
