import { Model } from '~/core/common/interfaces/model';
import { Scope } from '../entities/scope/Scope';
import { Target } from '../entities/target/Target';

export class ScopeModel extends Scope implements Model {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly target: Target,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super(name, target);
  }
}

export interface ScopesRepository {
  add(scope: Scope): Promise<ScopeModel>
  findById(id: string): Promise<ScopeModel | undefined>
  findByName(name: string): Promise<ScopeModel | undefined>
  findMany(): Promise<ScopeModel[]>
  update(id: string, updatedScope: Scope): Promise<ScopeModel>
  remove(id: string): Promise<void>
}

export function isScopesRepository(object: object): object is ScopesRepository {
  const fakeRepo = object as ScopesRepository;

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
