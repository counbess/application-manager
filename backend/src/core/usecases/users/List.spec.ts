/* eslint-disable no-new */
import { InMemoryUsersRepository } from '~/core/adapters/repository/InMemoryUsersRepository';
import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '~/core/domain/entities/user/User';
import { UsersRepository } from '~/core/domain/repository/Users';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';
import { ListUsersUseCase } from './List';

it('not should be able to instantiate a ListUsersUseCase without a repository', () => {
  function execution() {
    new ListUsersUseCase(undefined as unknown as UsersRepository);
  }

  expect(execution).toThrowError(MissingUsersRepositoryError);
});

it('not should be able to instantiate a ListUsersUseCase with a invalid repository', () => {
  function execution() {
    new ListUsersUseCase('repository' as unknown as UsersRepository);
  }

  expect(execution).toThrowError(InvalidUsersRepositoryError);
});

it('should be able to a admin emitter list all users', async () => {
  const repository = new InMemoryUsersRepository();
  const listUsersUseCase = new ListUsersUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const users = await listUsersUseCase.execute({ emitter, payload: undefined });

  expect(users).toBeDefined();
  expect(users.length).toBe(0);
});

it('should be able to a leader emitter list all users', async () => {
  const repository = new InMemoryUsersRepository();
  const listUsersUseCase = new ListUsersUseCase(repository);
  const emitter = new User('leader', UserRole.LEADER);

  const users = await listUsersUseCase.execute({ emitter, payload: undefined });

  expect(users).toBeDefined();
  expect(users.length).toBe(0);
});

it('not should be able to a developer emitter list all users', async () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();
    const listUsersUseCase = new ListUsersUseCase(repository);
    const emitter = new User('developer', UserRole.DEVELOPER);

    await listUsersUseCase.execute({ emitter, payload: undefined });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});
