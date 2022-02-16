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
import { FindUserByIdUseCase } from './FindById';

it('not should be able to instantiate a FindUserByIdUseCase without a repository', () => {
  function execution() {
    new FindUserByIdUseCase(undefined as unknown as UsersRepository);
  }

  expect(execution).toThrowError(MissingUsersRepositoryError);
});

it('not should be able to instantiate a FindUserByIdUseCase with a invalid repository', () => {
  function execution() {
    new FindUserByIdUseCase('repository' as unknown as UsersRepository);
  }

  expect(execution).toThrowError(InvalidUsersRepositoryError);
});

it('should be able to a admin emitter find a user by id', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const findUserByIdUseCase = new FindUserByIdUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const user = await addUserUseCase.execute(
    { emitter, payload: { username: 'leader', role: UserRole.LEADER } },
  );

  const findedUser = await findUserByIdUseCase.execute({ emitter, payload: { id: user.id } });

  expect(findedUser).toBeDefined();
  expect(findedUser?.username).toBe(user.username);
  expect(findedUser?.role).toBe(user.role);
  expect(findedUser?.createdAt).toBe(user.createdAt);
  expect(findedUser?.updatedAt).toBe(user.updatedAt);
});

it('should be able to a leader emitter find a user by id', async () => {
  const repository = new InMemoryUsersRepository();
  const addUserUseCase = new AddUserUseCase(repository);
  const findUserByIdUseCase = new FindUserByIdUseCase(repository);
  const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
  const leaderEmitter = new User('leader', UserRole.LEADER);

  const user = await addUserUseCase.execute(
    { emitter: adminEmitter, payload: { username: 'otherLeader', role: UserRole.LEADER } },
  );

  const findedUser = await findUserByIdUseCase.execute(
    { emitter: leaderEmitter, payload: { id: user.id } },
  );

  expect(findedUser).toBeDefined();
  expect(findedUser?.username).toBe(user.username);
  expect(findedUser?.role).toBe(user.role);
  expect(findedUser?.createdAt).toBe(user.createdAt);
  expect(findedUser?.updatedAt).toBe(user.updatedAt);
});

it('should be able to find a inexistent user id', async () => {
  const repository = new InMemoryUsersRepository();
  const findUserByIdUseCase = new FindUserByIdUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const findedUser = await findUserByIdUseCase.execute({ emitter, payload: { id: uuid() } });

  expect(findedUser).toBeUndefined();
});

it('not should be able to a developer emitter find a user by id', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUserUseCase = new AddUserUseCase(repository);
    const findUserByIdUseCase = new FindUserByIdUseCase(repository);
    const adminEmitter = new User('admin', UserRole.ADMINISTRATOR);
    const developerEmitter = new User('developer', UserRole.DEVELOPER);

    const user = await addUserUseCase.execute(
      { emitter: adminEmitter, payload: { username: 'otherLeader', role: UserRole.LEADER } },
    );

    await findUserByIdUseCase.execute(
      { emitter: developerEmitter, payload: { id: user.id } },
    );
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});
