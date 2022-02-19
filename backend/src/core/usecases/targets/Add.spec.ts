/* eslint-disable no-new */
import { validate, version } from 'uuid';

import { InMemoryTargetsRepository } from '~/core/adapters/repository/InMemoryTargetsRepository';
import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { UserRole } from '~/core/common/interfaces/user-role';
import { TargetTypes } from '~/core/domain/entities/target/Target';
import { User } from '~/core/domain/entities/user/User';
import { TargetsRepository } from '~/core/domain/repository/Targets';
import { AddTargetDTOInput, AddTargetDTOOutput, AddTargetUseCase } from './Add';
import { InvalidTargetsRepositoryError } from './errors/InvalidTargetsRepositoryError';
import { MissingTargetsRepositoryError } from './errors/MissingTargetsRepositoryError';
import { NameAlreadyExistsError } from './errors/NameAlreadyExistsError';

it('not should be able to instantiate a AddTargetUseCase without a repository', () => {
  function execution() {
    new AddTargetUseCase(undefined as unknown as TargetsRepository);
  }

  expect(execution).toThrowError(MissingTargetsRepositoryError);
});

it('not should be able to instantiate a AddTargetUseCase with a invalid repository', () => {
  function execution() {
    new AddTargetUseCase('repository' as unknown as TargetsRepository);
  }

  expect(execution).toThrowError(InvalidTargetsRepositoryError);
});

it('should be able to add a target', async () => {
  const repository = new InMemoryTargetsRepository();
  const addUseCase = new AddTargetUseCase(repository);
  const emitter = new User('admin', UserRole.ADMINISTRATOR);

  const input: AddTargetDTOInput = {
    name: 'dev',
    type: TargetTypes.DEVELOPMENT,
    host: 'localhost',
    port: 8080,
  };

  const expectedOutput: AddTargetDTOOutput = {
    id: 'uuid',
    name: input.name,
    type: input.type,
    host: input.host,
    port: input.port,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const target = await addUseCase.execute({ emitter, payload: input });

  expect(target).toBeDefined();

  expect(validate(target.id)).toBeTruthy();
  expect(version(target.id)).toBe(4);

  expect(target.name).toBe(expectedOutput.name);
  expect(target.type).toBe(expectedOutput.type);
  expect(target.host).toBe(expectedOutput.host);
  expect(target.port).toBe(expectedOutput.port);
  expect(target.createdAt).toBeInstanceOf(Date);
  expect(target.updatedAt).toBeInstanceOf(Date);
});

it('it not should be able to a non admin user add a target', () => {
  async function execution() {
    const repository = new InMemoryTargetsRepository();
    const addUseCase = new AddTargetUseCase(repository);
    const emitter = new User('dev', UserRole.DEVELOPER);

    const input: AddTargetDTOInput = {
      name: 'dev',
      type: TargetTypes.DEVELOPMENT,
      host: 'localhost',
      port: 8080,
    };

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(UnauthorizedError);
});

it('not should be able to add same target name some times', () => {
  async function execution() {
    const repository = new InMemoryTargetsRepository();
    const addUseCase = new AddTargetUseCase(repository);
    const emitter = new User('admin', UserRole.ADMINISTRATOR);

    const input: AddTargetDTOInput = {
      name: 'dev',
      type: TargetTypes.DEVELOPMENT,
      host: 'localhost',
      port: 8080,
    };

    const target = await addUseCase.execute({ emitter, payload: input });

    expect(target).toBeDefined();

    await addUseCase.execute({ emitter, payload: input });
  }

  expect(execution).rejects.toThrowError(NameAlreadyExistsError);
});
