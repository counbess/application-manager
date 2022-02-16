/* eslint-disable @typescript-eslint/no-empty-function */
import { InMemoryUsersRepository } from '~/core/adapters/repository/InMemoryUsersRepository';
import { isUsersRepository } from './Users';

it('should be able to is valid', () => {
  const repository = new InMemoryUsersRepository();
  const isValid = isUsersRepository(repository);

  expect(isValid).toBeTruthy();
});

it('not should be able to is valid without add function', () => {
  const isValid = isUsersRepository({
    findById: () => {},
    findByUsername: () => {},
    findMany: () => {},
    updateUserRole: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findById function', () => {
  const isValid = isUsersRepository({
    add: () => {},
    findByUsername: () => {},
    findMany: () => {},
    updateUserRole: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findByUsername function', () => {
  const isValid = isUsersRepository({
    add: () => {},
    findById: () => {},
    findMany: () => {},
    updateUserRole: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findMany function', () => {
  const isValid = isUsersRepository({
    add: () => {},
    findById: () => {},
    findByUsername: () => {},
    updateUserRole: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without updateUserRole function', () => {
  const isValid = isUsersRepository({
    add: () => {},
    findById: () => {},
    findByUsername: () => {},
    findMany: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without remove function', () => {
  const isValid = isUsersRepository({
    add: () => {},
    findById: () => {},
    findByUsername: () => {},
    findMany: () => {},
    updateUserRole: () => {},
  });

  expect(isValid).toBeFalsy();
});
