import { v4 as uuid, validate, version } from 'uuid';
import { Target, TargetTypes } from '~/core/domain/entities/target/Target';
import { TargetIdNotFoundError } from '~/core/usecases/targets/errors/TargetIdNotFoundError';

import { InMemoryTargetsRepository } from './InMemoryTargetsRepository';

it('should be able to add a target', async () => {
  const repository = new InMemoryTargetsRepository();
  const target = new Target('name', TargetTypes.DEVELOPMENT, 'localhost', 8080);

  const addedTarget = await repository.add(target);

  expect(addedTarget).toBeDefined();

  expect(validate(addedTarget.id)).toBeTruthy();
  expect(version(addedTarget.id)).toBe(4);

  expect(addedTarget.name).toBe(target.name);
  expect(addedTarget.type).toBe(target.type);
  expect(addedTarget.host).toBe(target.host);
  expect(addedTarget.port).toBe(target.port);
  expect(addedTarget.createdAt).toBeInstanceOf(Date);
  expect(addedTarget.updatedAt).toBeInstanceOf(Date);
});

it('should be able to add a target and get her by id', async () => {
  const repository = new InMemoryTargetsRepository();
  const target = new Target('name', TargetTypes.DEVELOPMENT, 'localhost', 8080);

  const addedTarget = await repository.add(target);

  expect(addedTarget).toBeDefined();

  const searchedTarget = await repository.findById(addedTarget.id);

  expect(searchedTarget).toBeDefined();

  expect(addedTarget.id).toBe(searchedTarget?.id);
  expect(addedTarget.name).toBe(searchedTarget?.name);
  expect(addedTarget.type).toBe(searchedTarget?.type);
  expect(addedTarget.host).toBe(searchedTarget?.host);
  expect(addedTarget.port).toBe(searchedTarget?.port);
  expect(addedTarget.createdAt).toBe(searchedTarget?.createdAt);
  expect(addedTarget.updatedAt).toBe(searchedTarget?.updatedAt);
});

it('should be able to add a user and get her by name', async () => {
  const repository = new InMemoryTargetsRepository();
  const target = new Target('name', TargetTypes.DEVELOPMENT, 'localhost', 8080);

  const addedTarget = await repository.add(target);

  expect(addedTarget).toBeDefined();

  const searchedUser = await repository.findByName(addedTarget.name);

  expect(searchedUser).toBeDefined();

  expect(addedTarget.id).toBe(searchedUser?.id);
  expect(addedTarget.name).toBe(searchedUser?.name);
  expect(addedTarget.type).toBe(searchedUser?.type);
  expect(addedTarget.host).toBe(searchedUser?.host);
  expect(addedTarget.port).toBe(searchedUser?.port);
  expect(addedTarget.createdAt).toBe(searchedUser?.createdAt);
  expect(addedTarget.updatedAt).toBe(searchedUser?.updatedAt);
});

it('should be able to list all users', async () => {
  const repository = new InMemoryTargetsRepository();

  await repository.add(new Target('dev', TargetTypes.DEVELOPMENT, 'localhost', 8080));
  await repository.add(new Target('hml', TargetTypes.HOMOLOGATION, 'localhost', 8080));
  await repository.add(new Target('prd', TargetTypes.PRODUCTION, 'localhost', 8080));

  const targets = await repository.findMany();

  expect(targets.length).toBe(3);
});

it('should be able to update a target', async () => {
  const repository = new InMemoryTargetsRepository();
  const target = new Target('dev', TargetTypes.DEVELOPMENT, 'localhost', 8080);

  const addedTarget = await repository.add(target);

  const newTargetData = new Target('prd', TargetTypes.PRODUCTION, 'localhost', 8080);
  const updatedTarget = await repository.update(addedTarget.id, newTargetData);

  expect(updatedTarget.id).toBe(updatedTarget.id);
  expect(updatedTarget.name).toBe(newTargetData.name);
  expect(updatedTarget.type).toBe(newTargetData.type);
  expect(updatedTarget.host).toBe(newTargetData.host);
  expect(updatedTarget.port).toBe(newTargetData.port);
});

it('should be able to remove a target', async () => {
  const repository = new InMemoryTargetsRepository();
  const target = new Target('dev', TargetTypes.DEVELOPMENT, 'localhost', 8080);

  const addedTarget = await repository.add(target);

  expect(addedTarget).toBeDefined();

  await repository.remove(addedTarget.id);

  const removedTarget = await repository.findById(addedTarget.id);

  expect(removedTarget).toBeUndefined();
});

it('not should be able to remove a inexistent target', () => {
  async function execution() {
    const repository = new InMemoryTargetsRepository();

    await repository.remove(uuid());
  }

  expect(execution).rejects.toThrowError(TargetIdNotFoundError);
});
