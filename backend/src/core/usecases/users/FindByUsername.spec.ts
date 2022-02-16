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
import { FindUserByUsernameUseCase } from './FindByUsername';

it('not should be able to instantiate a FindUserByUsernameUseCase without a repository', () => {
  function execution() {
    new FindUserByUsernameUseCase(
      undefined as unknown as UsersRepository,
    );
  }

  expect(execution).toThrowError(MissingUsersRepositoryError);
});

it('not should be able to instantiate a FindUserByUsernameUseCase with a invalid repository', () => {
  function execution() {
    new FindUserByUsernameUseCase('repository' as unknown as UsersRepository);
  }

  expect(execution).toThrowError(InvalidUsersRepositoryError);
});

it('should be able to a admin emitter find a user by username', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const findUserByUsernameUseCase = new FindUserByUsernameUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const user = await addUserUseCase.execute(
    { emitter, payload: { username: 'leader', role: UserRole.LEADER } },
  );

  const findedUser = await findUserByUsernameUseCase.execute(
    { emitter, payload: { username: user.username } },
  );

  expect(findedUser).toBeDefined();
  expect(findedUser?.username).toBe(user.username);
  expect(findedUser?.role).toBe(user.role);
  expect(findedUser?.createdAt).toBe(user.createdAt);
  expect(findedUser?.updatedAt).toBe(user.updatedAt);
});

it('should be able to a leader emitter find a user by username', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const findUserByUsernameUseCase = new FindUserByUsernameUseCase(repository);
  const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
  const leaderEmitter = new User('leader', UserRole.LEADER);

  const user = await addUserUseCase.execute(
    { emitter: adminEmitter, payload: { username: 'otherLeader', role: UserRole.LEADER } },
  );

  const findedUser = await findUserByUsernameUseCase.execute(
    { emitter: leaderEmitter, payload: { username: user.username } },
  );

  expect(findedUser).toBeDefined();
  expect(findedUser?.username).toBe(user.username);
  expect(findedUser?.role).toBe(user.role);
  expect(findedUser?.createdAt).toBe(user.createdAt);
  expect(findedUser?.updatedAt).toBe(user.updatedAt);
});

it('should be able to find a inexistent user username', async () => {
  const repository = new InMemoryUsersRepository();
  const findUserByUsernameUseCase = new FindUserByUsernameUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const findedUser = await findUserByUsernameUseCase.execute(
    { emitter, payload: { username: uuid() } },
  );

  expect(findedUser).toBeUndefined();
});

it('not should be able to a developer emitter find a user by username', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const findUserByUsernameUseCase = new FindUserByUsernameUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const developerEmitter = new User('developer', UserRole.DEVELOPER);

    const user = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'otherLeader', role: UserRole.LEADER } },
    );

    await findUserByUsernameUseCase.execute(
      { emitter: developerEmitter, payload: { username: user.username } },
    );
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});
