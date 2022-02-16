/* eslint-disable no-new */
import { v4 as uuid } from 'uuid';

import { InMemoryUsersRepository } from '~/core/adapters/repository/InMemoryUsersRepository';
import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '~/core/domain/entities/user/User';
import { UsersRepository } from '~/core/domain/repository/Users';
import { AddUserUseCase } from './Add';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';
import { UserIdNotFoundError } from './errors/UserIdNotFoundError';
import { UpdateUserRoleUseCase } from './UpdateRole';

it('not should be able to instantiate a UpdateUserRoleUseCase without a repository', () => {
  function execution() {
    new UpdateUserRoleUseCase(undefined as unknown as UsersRepository);
  }

  expect(execution).toThrowError(MissingUsersRepositoryError);
});

it('not should be able to instantiate a UpdateUserRoleUseCase with a invalid repository', () => {
  function execution() {
    new UpdateUserRoleUseCase('repository' as unknown as UsersRepository);
  }

  expect(execution).toThrowError(InvalidUsersRepositoryError);
});

it('should be able to a admin emitter update a user role independent of her current role', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const updateRoleUseCase = new UpdateUserRoleUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const user = await addUserUseCase.execute(
    { emitter, payload: { username: 'developer', role: UserRole.DEVELOPER } },
  );

  const updatedUser = await updateRoleUseCase.execute(
    { emitter, payload: { id: user.id, role: UserRole.LEADER } },
  );

  expect(user.id).toBe(updatedUser.id);
  expect(updatedUser.role).toBe(UserRole.LEADER);
  expect(user.createdAt).toBe(updatedUser.createdAt);
  expect(user.updatedAt.getTime()).toBeLessThanOrEqual(updatedUser.updatedAt.getTime());
});

it('not should be able to a leader emitter update a user role independent of her current role', () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const updateRoleUseCase = new UpdateUserRoleUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const leaderEmitter = new User('leader', UserRole.LEADER);

    const user = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'developer', role: UserRole.DEVELOPER } },
    );

    await updateRoleUseCase.execute(
      { emitter: leaderEmitter, payload: { id: user.id, role: UserRole.LEADER } },
    );
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to a developer emitter update a user role independent of her current role', () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const updateRoleUseCase = new UpdateUserRoleUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const developerEmitter = new User('developer', UserRole.DEVELOPER);

    const user = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'developer', role: UserRole.DEVELOPER } },
    );

    await updateRoleUseCase.execute(
      { emitter: developerEmitter, payload: { id: user.id, role: UserRole.LEADER } },
    );
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to update a role from a inexistent user', () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const updateRoleUseCase = new UpdateUserRoleUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);

    await updateRoleUseCase.execute(
      { emitter: adminEmitter, payload: { id: uuid(), role: UserRole.LEADER } },
    );
  }

  expect(execution).rejects.toThrowError(UserIdNotFoundError);
});
