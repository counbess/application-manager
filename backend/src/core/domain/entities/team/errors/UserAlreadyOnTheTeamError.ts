import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class UserAlreadyOnTheTeamError extends ApplicationManagerError {
  constructor() {
    super('User is already on the team', ApplicationErrorCodes.USER_ALREADY_ON_THE_TEAM);
  }
}
