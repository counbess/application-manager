/* eslint-disable no-new */
import { validate, version } from 'uuid';

import { InMemoryScopesRepository } from '~/core/adapters/repository/InMemoryScopesRepository';
import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { UserRole } from '~/core/common/interfaces/user-role';
import { Target, TargetTypes } from '~/core/domain/entities/target/Target';
import { User } from '~/core/domain/entities/user/User';
import { ScopesRepository } from '~/core/domain/repository/Scopes';
import { AddScopeDTOInput, AddScopeDTOOutput, AddScopeUseCase } from './Add';
import { InvalidScopesRepositoryError } from './errors/InvalidScopesRepositoryError';
import { MissingScopesRepositoryError } from './errors/MissingScopesRepositoryError';
import { NameAlreadyExistsError } from './errors/NameAlreadyExistsError';

it('not should be able to instantiate a AddScopeUseCase without a repository', () => {
  function execution() {
    new AddScopeUseCase(undefined as unknown as ScopesRepository);
  }

  expect(execution).toThrowError(MissingScopesRepositoryError);
});

it('not should be able to instantiate a AddScopeUseCase with a invalid repository', () => {
  function execution() {
    new AddScopeUseCase('repository' as unknown as ScopesRepository);
  }

  expect(execution).toThrowError(InvalidScopesRepositoryError);
});

it('should be able to add a target', async () => {
  const repository = new InMemoryScopesRepository();
  const addUseCase = new AddScopeUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);
  const target = new Target('dev', TargetTypes.DEVELOPMENT, 'localhost', 8080);

  const input: AddScopeDTOInput = {
    name: 'dev',
    target,
  };

  const expectedOutput: AddScopeDTOOutput = {
    id: 'uuid',
    name: input.name,
    target: input.target,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const scope = await addUseCase.execute({ emitter, payload: input });

  expect(scope).toBeDefined();

  expect(validate(scope.id)).toBeTruthy();
  expect(version(scope.id)).toBe(4);

  expect(scope.name).toBe(expectedOutput.name);
  expect(scope.target).toBe(expectedOutput.target);
  expect(scope.createdAt).toBeInstanceOf(Date);
  expect(scope.updatedAt).toBeInstanceOf(Date);
});

it('it not should be able to a non admin user add a target', () => {
  async function execution() {
    const repository = new InMemoryScopesRepository();
    const addUseCase = new AddScopeUseCase(repository);
    const emitter = new User('dev', UserRole.DEVELOPER);
    const target = new Target('dev', TargetTypes.DEVELOPMENT, 'localhost', 8080);

    const input: AddScopeDTOInput = {
      name: 'dev',
      target,
    };

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to add same target name some times', () => {
  async function execution() {
    const repository = new InMemoryScopesRepository();
    const addUseCase = new AddScopeUseCase(repository);
    const emitter = new User('admin', UserRole.ADMINISTRATOR);
    const target = new Target('dev', TargetTypes.DEVELOPMENT, 'localhost', 8080);

    const input: AddScopeDTOInput = {
      name: 'dev',
      target,
    };

    const scope = await addUseCase.execute({ emitter, payload: input });

    expect(scope).toBeDefined();

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(NameAlreadyExistsError);
});
