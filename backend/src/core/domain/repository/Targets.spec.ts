/* eslint-disable @typescript-eslint/no-empty-function */
import { InMemoryTargetsRepository } from '~/core/adapters/repository/InMemoryTargetsRepository';
import { isTargetsRepository } from './Targets';

it('should be able to is valid', () => {
  const repository = new InMemoryTargetsRepository();
  const isValid = isTargetsRepository(repository);

  expect(isValid).toBeTruthy();
});

it('not should be able to is valid without add function', () => {
  const isValid = isTargetsRepository({
    findById: () => {},
    findByName: () => {},
    findMany: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findById function', () => {
  const isValid = isTargetsRepository({
    add: () => {},
    findByName: () => {},
    findMany: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findByName function', () => {
  const isValid = isTargetsRepository({
    add: () => {},
    findById: () => {},
    findMany: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without findMany function', () => {
  const isValid = isTargetsRepository({
    add: () => {},
    findById: () => {},
    findByName: () => {},
    update: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without update function', () => {
  const isValid = isTargetsRepository({
    add: () => {},
    findById: () => {},
    findByName: () => {},
    findMany: () => {},
    remove: () => {},
  });

  expect(isValid).toBeFalsy();
});

it('not should be able to is valid without remove function', () => {
  const isValid = isTargetsRepository({
    add: () => {},
    findById: () => {},
    findByName: () => {},
    findMany: () => {},
    update: () => {},
  });

  expect(isValid).toBeFalsy();
});
