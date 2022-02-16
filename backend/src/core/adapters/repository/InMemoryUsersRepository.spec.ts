import { v4 as uuid, validate, version } from 'uuid';

import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '~/core/domain/entities/user/User';
import { UserIdNotFoundError } from '~/core/usecases/users/errors/UserIdNotFoundError';
import { InMemoryUsersRepository } from './InMemoryUsersRepository';

it('should be able to add a user', async () => {
  const repository = new InMemoryUsersRepository();
  const user = new User('username', UserRole.ADMINISTRATOR);

  const addedUser = await repository.add(user);

  expect(addedUser).toBeDefined();

  expect(validate(addedUser.id)).toBeTruthy();
  expect(version(addedUser.id)).toBe(4);

  expect(addedUser.username).toBe(user.username);
  expect(addedUser.role).toBe(user.role);
  expect(addedUser.createdAt).toBeInstanceOf(Date);
  expect(addedUser.updatedAt).toBeInstanceOf(Date);
});

it('should be able to add a user and get her by id', async () => {
  const repository = new InMemoryUsersRepository();
  const user = new User('username', UserRole.ADMINISTRATOR);

  const addedUser = await repository.add(user);

  expect(addedUser).toBeDefined();

  const searchedUser = await repository.findById(addedUser.id);

  expect(searchedUser).toBeDefined();

  expect(addedUser.id).toBe(searchedUser?.id);
  expect(addedUser.username).toBe(searchedUser?.username);
  expect(addedUser.role).toBe(searchedUser?.role);
  expect(addedUser.createdAt).toBe(searchedUser?.createdAt);
  expect(addedUser.updatedAt).toBe(searchedUser?.updatedAt);
});

it('should be able to add a user and get her by name', async () => {
  const repository = new InMemoryUsersRepository();
  const user = new User('username', UserRole.ADMINISTRATOR);

  const addedUser = await repository.add(user);

  expect(addedUser).toBeDefined();

  const searchedUser = await repository.findByUsername(addedUser.username);

  expect(searchedUser).toBeDefined();

  expect(addedUser.id).toBe(searchedUser?.id);
  expect(addedUser.username).toBe(searchedUser?.username);
  expect(addedUser.role).toBe(searchedUser?.role);
  expect(addedUser.createdAt).toBe(searchedUser?.createdAt);
  expect(addedUser.updatedAt).toBe(searchedUser?.updatedAt);
});

it('should be able to list all users', async () => {
  const repository = new InMemoryUsersRepository();

  await repository.add(new User('admin', UserRole.ADMINISTRATOR));
  await repository.add(new User('leader', UserRole.LEADER));
  await repository.add(new User('dev', UserRole.DEVELOPER));

  const users = await repository.findMany();

  expect(users.length).toBe(3);
});

it('should be able to update a user role', async () => {
  const repository = new InMemoryUsersRepository();
  const user = new User('username', UserRole.ADMINISTRATOR);

  const addedUser = await repository.add(user);

  const updatedUser = await repository.updateUserRole(addedUser.id, UserRole.DEVELOPER);

  expect(updatedUser.role).toBe(UserRole.DEVELOPER);
});

it('should be able to remove a user', async () => {
  const repository = new InMemoryUsersRepository();
  const user = new User('username', UserRole.ADMINISTRATOR);

  const addedUser = await repository.add(user);

  expect(addedUser).toBeDefined();

  await repository.remove(addedUser.id);

  const removedUser = await repository.findById(addedUser.id);

  expect(removedUser).toBeUndefined();
});

it('not should be able to remove a inexistent user', () => {
  async function execution() {
    const repository = new InMemoryUsersRepository();

    await repository.remove(uuid());
  }

  expect(execution).rejects.toThrowError(UserIdNotFoundError);
});
