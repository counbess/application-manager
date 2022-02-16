import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingApplicationNameError extends ApplicationManagerError {
  constructor() {
    super('Missing application name', ApplicationErrorCodes.MISSING_APPLICATION_NAME);
  }
}
