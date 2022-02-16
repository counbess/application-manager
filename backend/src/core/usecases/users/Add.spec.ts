/* eslint-disable no-new */
import { validate, version } from 'uuid';

import { InMemoryUsersRepository } from '~/core/adapters/repository/InMemoryUsersRepository';
import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '~/core/domain/entities/user/User';
import { UsersRepository } from '~/core/domain/repository/Users';

import { AddUserUseCase, AddUserDTOInput, AddUserDTOOutput } from './Add';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError';

it('not should be able to instantiate a AddUserUseCase without a repository', () => {
  function execution() {
    new AddUserUseCase(undefined as unknown as UsersRepository);
  }

  expect(execution).toThrowError(MissingUsersRepositoryError);
});

it('not should be able to instantiate a AddUserUseCase with a invalid repository', () => {
  function execution() {
    new AddUserUseCase('repository' as unknown as UsersRepository);
  }

  expect(execution).toThrowError(InvalidUsersRepositoryError);
});

it('should be able to admin emitter add a user independent from user role', async () => {
  const repository = new InMemoryUsersRepository();
  const addUseCase = new AddUserUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const input: AddUserDTOInput = {
    username: 'admin',
    role: UserRole.ADMINISTRATOR,
  };

  const expectedOutput: AddUserDTOOutput = {
    id: 'uuid',
    username: input.username,
    role: input.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const user = await addUseCase.execute({ emitter, payload: input });

  expect(user).toBeDefined();

  expect(validate(user.id)).toBeTruthy();
  expect(version(user.id)).toBe(4);

  expect(user.username).toBe(expectedOutput.username);
  expect(user.role).toBe(expectedOutput.role);
  expect(user.createdAt).toBeInstanceOf(Date);
  expect(user.updatedAt).toBeInstanceOf(Date);
});

it('should be able to a leader emitter add a developer user', async () => {
  const repository = new InMemoryUsersRepository();
  const addUseCase = new AddUserUseCase(repository);
  const emitter = new User('leader', UserRole.LEADER);

  const input: AddUserDTOInput = {
    username: 'developer',
    role: UserRole.DEVELOPER,
  };

  const expectedOutput: AddUserDTOOutput = {
    id: 'uuid',
    username: input.username,
    role: input.role,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const user = await addUseCase.execute({ emitter, payload: input });

  expect(user).toBeDefined();

  expect(validate(user.id)).toBeTruthy();
  expect(version(user.id)).toBe(4);

  expect(user.username).toBe(expectedOutput.username);
  expect(user.role).toBe(expectedOutput.role);
  expect(user.createdAt).toBeInstanceOf(Date);
  expect(user.updatedAt).toBeInstanceOf(Date);
});

it('not should be able to a developer add a user independent from user role', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUseCase = new AddUserUseCase(repository);
    const emitter = new User('developer', UserRole.DEVELOPER);

    const input: AddUserDTOInput = {
      username: 'developer',
      role: UserRole.DEVELOPER,
    };

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to a leader emitter add a admin user', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUseCase = new AddUserUseCase(repository);
    const emitter = new User('leader', UserRole.LEADER);

    const input: AddUserDTOInput = {
      username: 'admin',
      role: UserRole.ADMINISTRATOR,
    };

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to a leader emitter add other leader user', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUseCase = new AddUserUseCase(repository);
    const emitter = new User('leader', UserRole.LEADER);

    const input: AddUserDTOInput = {
      username: 'leader',
      role: UserRole.LEADER,
    };

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to add a same user some times', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const addUseCase = new AddUserUseCase(repository);
    const emitter = new User('admin', UserRole.ADMINISTRATOR);

    const input: AddUserDTOInput = {
      username: 'admin',
      role: UserRole.ADMINISTRATOR,
    };

    const user = await addUseCase.execute({ emitter, payload: input });

    expect(user).toBeDefined();

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(UsernameAlreadyExistsError);
});
