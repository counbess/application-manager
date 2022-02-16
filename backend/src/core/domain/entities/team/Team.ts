import { Permission } from '~/core/common/interfaces/permission';
import { User } from '../user/User';
import { MissingPermissionInUserError } from './errors/MissingPermissionInUserError';
import { PermissionAlreadyAddedToUserError } from './errors/PermissionAlreadyAddedToUserError';
import { UserAlreadyOnTheTeamError } from './errors/UserAlreadyOnTheTeamError';
import { UserNotOnTheTeamError } from './errors/UserNotOnTheTeamError';

export interface PermissionedUser {
  readonly user: User
  readonly permissions: Permission[]
}

export class Team {
  private permissionedUsers: Map<string, PermissionedUser> = new Map();

  addUser(user: User) {
    try {
      this.getUser(user.username);

      throw new UserAlreadyOnTheTeamError();
    } catch (error) {
      if (error instanceof UserNotOnTheTeamError) {
        this.permissionedUsers.set(user.username, { user, permissions: [] });
      } else {
        throw error;
      }
    }
  }

  getUser(username: string): PermissionedUser {
    const entry = this.permissionedUsers.get(username);

    if (!entry) {
      throw new UserNotOnTheTeamError();
    }

    return { user: entry.user, permissions: [...entry.permissions] };
  }

  removeUser(username: string) {
    const { user } = this.getUser(username);

    this.permissionedUsers.delete(user.username);
  }

  attachUserPermission(permission: Permission, username: string) {
    const { user, permissions } = this.getUser(username);

    const alreadyHavePermission = this.userHasPermission(permission, username);

    if (alreadyHavePermission) {
      throw new PermissionAlreadyAddedToUserError();
    }

    this.permissionedUsers.set(username, {
      user,
      permissions: [...permissions, permission],
    });
  }

  revokeUserPermission(permission: Permission, username: string) {
    const { user, permissions } = this.getUser(username);

    const alreadyHavePermission = this.userHasPermission(permission, username);

    if (!alreadyHavePermission) {
      throw new MissingPermissionInUserError();
    }

    this.permissionedUsers.set(username, {
      user,
      permissions: permissions.filter((addedPermission) => addedPermission !== permission),
    });
  }

  userHasPermission(permission: Permission, username: string): boolean {
    const { permissions } = this.getUser(username);

    const havePermission = permissions.some(
      (addedPermission) => addedPermission === permission,
    );

    return havePermission;
  }
}
