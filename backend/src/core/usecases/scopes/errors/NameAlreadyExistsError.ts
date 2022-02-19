import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class NameAlreadyExistsError extends ApplicationManagerError {
  constructor() {
    super('Scope name already exists', ApplicationErrorCodes.SCOPE_NAME_ALREADY_EXISTS);
  }
}
