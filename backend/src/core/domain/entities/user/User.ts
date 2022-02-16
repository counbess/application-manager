import { InvalidUserUsernameError } from './errors/InvalidUserUsernameError';
import { MissingUserUsernameError } from './errors/MissingUserUsernameError';
import { UserRole } from '~/core/common/interfaces/user-role';
import { MissingUserRoleError } from './errors/MissingUserRoleError';
import { InvalidUserRoleError } from './errors/InvalidUserRoleError';

export class User {
  constructor(readonly username: string, readonly role: UserRole) {
    if (!username) {
      throw new MissingUserUsernameError();
    } else if (typeof username !== 'string') {
      throw new InvalidUserUsernameError();
    }

    if (!role) {
      throw new MissingUserRoleError();
    } else if (
      role !== UserRole.ADMINISTRATOR
      && role !== UserRole.LEADER
      && role !== UserRole.DEVELOPER
    ) {
      throw new InvalidUserRoleError();
    }
  }
}
