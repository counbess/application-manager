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
import { ListUsersUseCase } from './List';
import { RemoveUserUseCase } from './Remove';

it('not should be able to instantiate a RemoveUserUseCase without a repository', () => {
  function execution() {
    new RemoveUserUseCase(undefined as unknown as UsersRepository);
  }

  expect(execution).toThrowError(MissingUsersRepositoryError);
});

it('not should be able to instantiate a RemoveUserUseCase with a invalid repository', () => {
  function execution() {
    new RemoveUserUseCase('repository' as unknown as UsersRepository);
  }

  expect(execution).toThrowError(InvalidUsersRepositoryError);
});

it('should be able to a admin remove a user independent of her role', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const listUsersUseCase = new ListUsersUseCase(repository);
  const removeUserUseCase = new RemoveUserUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const user = await addUserUseCase.execute({
    emitter,
    payload: {
      username: 'otherAdmin',
      role: UserRole.ADMINISTRATOR,
    },
  });

  expect(user).toBeDefined();

  let users = await listUsersUseCase.execute({ emitter, payload: undefined });

  expect(users.length).toBe(1);

  await removeUserUseCase.execute({ emitter, payload: { id: user.id } });

  users = await listUsersUseCase.execute({ emitter, payload: undefined });

  expect(users.length).toBe(0);
});

it('should be able to a leader remove a developer user', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const listUsersUseCase = new ListUsersUseCase(repository);
  const removeUserUseCase = new RemoveUserUseCase(repository);
  const emitter = new User('leader', UserRole.LEADER);

  const user = await addUserUseCase.execute({
    emitter,
    payload: {
      username: 'developer',
      role: UserRole.DEVELOPER,
    },
  });

  expect(user).toBeDefined();

  let users = await listUsersUseCase.execute({ emitter, payload: undefined });

  expect(users.length).toBe(1);

  await removeUserUseCase.execute({ emitter, payload: { id: user.id } });

  users = await listUsersUseCase.execute({ emitter, payload: undefined });

  expect(users.length).toBe(0);
});

it('not should be able to a leader remove other leader', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const removeUserUseCase = new RemoveUserUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const leaderEmitter = new User('leader', UserRole.LEADER);

    const leader = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'otherLeader', role: UserRole.LEADER } },
    );

    await removeUserUseCase.execute({ emitter: leaderEmitter, payload: { id: leader.id } });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to a leader remove a admin user', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const removeUserUseCase = new RemoveUserUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const leaderEmitter = new User('leader', UserRole.LEADER);

    const admin = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'admin', role: UserRole.ADMINISTRATOR } },
    );

    await removeUserUseCase.execute({ emitter: leaderEmitter, payload: { id: admin.id } });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to a developer remove a user independent of her role', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const listUsersUseCase = new ListUsersUseCase(repository);
    const removeUserUseCase = new RemoveUserUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const developerEmitter = new User('developer', UserRole.DEVELOPER);

    const user = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'leader', role: UserRole.LEADER } },
    );

    const users = await listUsersUseCase.execute({ emitter: adminEmitter, payload: undefined });

    expect(users.length).toBe(1);

    await removeUserUseCase.execute({ emitter: developerEmitter, payload: { id: user.id } });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to remove a inexistent user', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const listUsersUseCase = new ListUsersUseCase(repository);
    const removeUserUseCase = new RemoveUserUseCase(repository);
    const emitter = new User('admin', UserRole.ADMINISTRATOR);

    const users = await listUsersUseCase.execute({ emitter, payload: undefined });

    expect(users.length).toBe(0);

    await removeUserUseCase.execute({ emitter, payload: { id: uuid() } });
  }

  expect(execution).rejects.toThrowError(UserIdNotFoundError);
});
