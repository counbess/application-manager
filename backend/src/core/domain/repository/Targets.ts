import { Model } from '~/core/common/interfaces/model';
import { Target, TargetTypes } from '../entities/target/Target';

export class TargetModel extends Target implements Model {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly type: TargetTypes,
    readonly host: string,
    readonly port: number,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super(name, type, host, port);
  }
}

export interface TargetsRepository {
  add(target: Target): Promise<TargetModel>
  findById(id: string): Promise<TargetModel | undefined>
  findByName(name: string): Promise<TargetModel | undefined>
  findMany(): Promise<TargetModel[]>
  update(id: string, updatedTarget: Target): Promise<TargetModel>
  remove(id: string): Promise<void>
}

export function isTargetsRepository(object: object): object is TargetsRepository {
  const fakeRepo = object as TargetsRepository;

  if (!fakeRepo.add || typeof fakeRepo.add !== 'function') {
    return false;
  }

  if (!fakeRepo.findById || typeof fakeRepo.findById !== 'function') {
    return false;
  }

  if (!fakeRepo.findByName || typeof fakeRepo.findByName !== 'function') {
    return false;
  }

  if (!fakeRepo.findMany || typeof fakeRepo.findMany !== 'function') {
    return false;
  }

  if (!fakeRepo.update || typeof fakeRepo.update !== 'function') {
    return false;
  }

  if (!fakeRepo.remove || typeof fakeRepo.remove !== 'function') {
    return false;
  }

  return true;
}
