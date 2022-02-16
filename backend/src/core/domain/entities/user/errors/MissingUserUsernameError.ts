import { ApplicationManagerError, ApplicationErrorCodes } from '~/core/common/interfaces/error';

export class MissingUserUsernameError extends ApplicationManagerError {
  constructor() {
    super('Missing user username', ApplicationErrorCodes.MISSING_USER_USERNAME);
  }
}
