import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class NameAlreadyExistsError extends ApplicationManagerError {
  constructor() {
    super('Target name already exists', ApplicationErrorCodes.TARGET_NAME_ALREADY_EXISTS);
  }
}
