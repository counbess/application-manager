import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingApplicationOwnerError extends ApplicationManagerError {
  constructor() {
    super('Missing application owner', ApplicationErrorCodes.MISSING_APPLICATION_OWNER);
  }
}
