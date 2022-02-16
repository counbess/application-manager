import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class InvalidVersionNumberFormatError extends ApplicationManagerError {
  constructor() {
    super('Invalid version number format', ApplicationErrorCodes.INVALID_VERSION_NUMBER_FORMAT);
  }
}
