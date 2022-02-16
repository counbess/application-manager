import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class MissingVersionNumberError extends ApplicationManagerError {
  constructor() {
    super('Missing version number', ApplicationErrorCodes.MISSING_VERSION_NUMBER);
  }
}
