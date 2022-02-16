import { ApplicationErrorCodes, ApplicationManagerError } from '~/core/common/interfaces/error';

export class UserNotOnTheTeamError extends ApplicationManagerError {
  constructor() {
    super('User is not on the team', ApplicationErrorCodes.USER_NOT_ON_THE_TEAM);
  }
}
