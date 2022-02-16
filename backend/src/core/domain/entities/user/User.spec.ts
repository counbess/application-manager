/* eslint-disable no-new */
import { InvalidUserUsernameError } from './errors/InvalidUserUsernameError';
import { MissingUserUsernameError } from './errors/MissingUserUsernameError';
import { User } from './User';
import { UserRole } from '~/core/common/interfaces/user-role';
import { InvalidUserRoleError } from './errors/InvalidUserRoleError';
import { MissingUserRoleError } from './errors/MissingUserRoleError';

it('should be able to create a user', () => {
  const user = new User('username', UserRole.DEVELOPER);

  expect(user).toBeDefined();
});

it('not should be able to create a user without username', () => {
  function execution() {
    new User(undefined as unknown as string, UserRole.DEVELOPER);
  }

  expect(execution).toThrowError(MissingUserUsernameError);
});

it('not should be able to create a user with a invalid username', () => {
  function execution() {
    new User(1 as unknown as string, UserRole.DEVELOPER);
  }

  expect(execution).toThrowError(InvalidUserUsernameError);
});

it('not should be able to create a user without role', () => {
  function execution() {
    new User('username', undefined as unknown as UserRole);
  }

  expect(execution).toThrowError(MissingUserRoleError);
});

it('not should be able to create a user with a invalid role', () => {
  function execution() {
    new User('username', 1 as unknown as UserRole);
  }

  expect(execution).toThrowError(InvalidUserRoleError);
});
