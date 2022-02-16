import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidVersionNumberError extends ApplicationManagerError {
  constructor() {
    super('Invalid version number', ApplicationErrorCodes.INVALID_VERSION_NUMBER);
  }
}
