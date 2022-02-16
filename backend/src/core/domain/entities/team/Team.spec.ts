import { Permission } from '~/core/common/interfaces/permission';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '../user/User';
import { MissingPermissionInUserError } from './errors/MissingPermissionInUserError';
import { PermissionAlreadyAddedToUserError } from './errors/PermissionAlreadyAddedToUserError';
import { UserAlreadyOnTheTeamError } from './errors/UserAlreadyOnTheTeamError';
import { UserNotOnTheTeamError } from './errors/UserNotOnTheTeamError';
import { Team } from './Team';

it('should be able to create a team', () => {
  const team = new Team();

  expect(team).toBeDefined();
});

it('should be able to add a user inside a team and access her and permissions', () => {
  const team = new Team();
  const user = new User('username', UserRole.DEVELOPER);

  team.addUser(user);

  const permissionedUser = team.getUser(user.username);

  expect(permissionedUser.user).toBe(user);
  expect(permissionedUser.permissions).toBeInstanceOf(Array);
});

it('not should be able to get a user who is not on the team', () => {
  function execution() {
    const team = new Team();
    team.getUser('username');
  }

  expect(execution).toThrowError(UserNotOnTheTeamError);
});

it('not should be able to add a user some times on the team', () => {
  function execution() {
    const team = new Team();
    const user = new User('username', UserRole.DEVELOPER);

    team.addUser(user);

    const permissionedUser = team.getUser(user.username);

    expect(permissionedUser.user).toBe(user);

    team.addUser(user);
    team.getUser(user.username);
  }

  expect(execution).toThrowError(UserAlreadyOnTheTeamError);
});

it('should be able to remove a added user on the team', () => {
  function execution() {
    const team = new Team();
    const user = new User('username', UserRole.DEVELOPER);

    team.addUser(user);

    const permissionedUser = team.getUser(user.username);

    expect(permissionedUser.user).toBe(user);

    team.removeUser(user.username);
    team.getUser(user.username);
  }

  expect(execution).toThrowError(UserNotOnTheTeamError);
});

it('not should be able to remove a user when her in not on the team', () => {
  function execution() {
    const team = new Team();
    const username = 'username';

    team.removeUser(username);
    team.getUser(username);
  }

  expect(execution).toThrowError(UserNotOnTheTeamError);
});

it('should be able to attach a permission to a user on the team', () => {
  const team = new Team();
  const user = new User('username', UserRole.DEVELOPER);

  team.addUser(user);

  team.attachUserPermission(Permission.ADD_USER_TO_TEAM, user.username);

  const permissionedUser = team.getUser(user.username);

  expect(permissionedUser.permissions[0]).toBe(Permission.ADD_USER_TO_TEAM);
});

it('not should be able to attach same permission some times to a user on the team', () => {
  function execution() {
    const team = new Team();
    const user = new User('username', UserRole.DEVELOPER);

    team.addUser(user);

    team.attachUserPermission(Permission.ADD_USER_TO_TEAM, user.username);

    const permissionedUser = team.getUser(user.username);

    expect(permissionedUser.permissions[0]).toBe(Permission.ADD_USER_TO_TEAM);

    team.attachUserPermission(Permission.ADD_USER_TO_TEAM, user.username);
  }

  expect(execution).toThrowError(PermissionAlreadyAddedToUserError);
});

it('not should be able to attach a permission to a user who is not on the team', () => {
  function execution() {
    const team = new Team();

    team.attachUserPermission(Permission.ADD_USER_TO_TEAM, 'username');
  }

  expect(execution).toThrowError(UserNotOnTheTeamError);
});

it('should be able to revoke a permission to a user on the team', () => {
  const team = new Team();
  const user = new User('username', UserRole.DEVELOPER);

  team.addUser(user);
  team.attachUserPermission(Permission.ADD_USER_TO_TEAM, user.username);

  const permissionedUser = team.getUser(user.username);

  expect(permissionedUser.permissions[0]).toBe(Permission.ADD_USER_TO_TEAM);

  team.revokeUserPermission(Permission.ADD_USER_TO_TEAM, user.username);

  const samePermissionedUser = team.getUser(user.username);

  expect(samePermissionedUser.permissions[0]).toBeUndefined();
});

it('not should be able to revoke a permission to a user when her is not on the team', () => {
  function execution() {
    const team = new Team();

    team.revokeUserPermission(Permission.ADD_USER_TO_TEAM, 'username');
  }

  expect(execution).toThrowError(UserNotOnTheTeamError);
});

it('not should be able to revoke a permission to a user when her do not have her', () => {
  function execution() {
    const team = new Team();
    const user = new User('username', UserRole.DEVELOPER);

    team.addUser(user);

    const permissionedUser = team.getUser(user.username);

    expect(permissionedUser.permissions[0]).toBeUndefined();

    team.revokeUserPermission(Permission.ADD_USER_TO_TEAM, user.username);
  }

  expect(execution).toThrowError(MissingPermissionInUserError);
});

it('should be able to verify if user have a specific permission', () => {
  const team = new Team();
  const user = new User('username', UserRole.DEVELOPER);
  const permission = Permission.ADD_USER_TO_TEAM;

  team.addUser(user);

  let userHaveAddUserToTeamPermission = team.userHasPermission(permission, user.username);

  expect(userHaveAddUserToTeamPermission).toBeFalsy();

  team.attachUserPermission(permission, user.username);

  userHaveAddUserToTeamPermission = team.userHasPermission(permission, user.username);

  expect(userHaveAddUserToTeamPermission).toBeTruthy();
});

it('not should be able to verify if a use have specific permission when her not on the team', () => {
  function execution() {
    const team = new Team();

    team.userHasPermission(Permission.ADD_USER_TO_TEAM, 'username');
  }

  expect(execution).toThrowError(UserNotOnTheTeamError);
});
