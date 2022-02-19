/* eslint-disable @typescript-eslint/no-empty-function */
import { InMemoryScopesRepository } from '~/core/adapters/repository/InMemoryScopesRepository';
import { isScopesRepository } from './Scopes';

it('should be able to is valid', () => {
  const repository = new InMemoryScopesRepository();
  const isValid = isScopesRepository(repository);

  expect(isValid).toBeTruthy();
});

it('not should be able to is valid without add function', () => {
  const isValid = isScopesRepository({
    findById: () => {},
    findByName: () => {},
    findMany: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findById function', () => {
  const isValid = isScopesRepository({
    add: () => {},
    findByName: () => {},
    findMany: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findByName function', () => {
  const isValid = isScopesRepository({
    add: () => {},
    findById: () => {},
    findMany: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findMany function', () => {
  const isValid = isScopesRepository({
    add: () => {},
    findById: () => {},
    findByName: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without update function', () => {
  const isValid = isScopesRepository({
    add: () => {},
    findById: () => {},
    findByName: () => {},
    findMany: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without remove function', () => {
  const isValid = isScopesRepository({
    add: () => {},
    findById: () => {},
    findByName: () => {},
    findMany: () => {},
    update: () => {},
  });

  expect(isValid).toBeFalsy();
});
