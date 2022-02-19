import { v4 as uuid } from 'uuid';
import { Scope } from '~/core/domain/entities/scope/Scope';

import { ScopeModel, ScopesRepository } from '~/core/domain/repository/Scopes';
import { ScopeIdNotFoundError } from '~/core/usecases/scopes/errors/ScopeIdNotFoundError';

export class InMemoryScopesRepository implements ScopesRepository {
  private scopes: ScopeModel[] = [];

  async add(scope: Scope): Promise<ScopeModel> {
    const model = new ScopeModel(
      uuid(),
      scope.name,
      scope.target,
      new Date(),
      new Date(),
    );

    this.scopes.push(model);

    return model;
  }

  async findById(id: string): Promise<ScopeModel | undefined> {
    const model = this.scopes.find((scope) => scope.id === id);

    return model;
  }

  async findByName(name: string): Promise<ScopeModel | undefined> {
    const model = this.scopes.find((scopes) => scopes.name === name);

    return model;
  }

  async findMany(): Promise<ScopeModel[]> {
    return this.scopes;
  }

  async update(id: string, updatedScope: Scope): Promise<ScopeModel> {
    const modelIndex = this.scopes.findIndex((scope) => scope.id === id);

    const model = this.scopes[modelIndex];
    const updatedModel = new ScopeModel(
      model.id,
      updatedScope.name,
      updatedScope.target,
      model.createdAt,
      new Date(),
    );

    this.scopes[modelIndex] = updatedModel;

    return this.scopes[modelIndex];
  }

  async remove(id: string): Promise<void> {
    const modelIndex = this.scopes.findIndex((scope) => scope.id === id);

    if (modelIndex !== -1) {
      this.scopes.splice(modelIndex, 1);
    } else {
      throw new ScopeIdNotFoundError();
    }
  }
}
