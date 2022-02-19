import { v4 as uuid } from 'uuid';

import { Target } from '~/core/domain/entities/target/Target';
import { TargetModel, TargetsRepository } from '~/core/domain/repository/Targets';
import { TargetIdNotFoundError } from '~/core/usecases/targets/errors/TargetIdNotFoundError';

export class InMemoryTargetsRepository implements TargetsRepository {
  private targets: TargetModel[] = [];

  async add(target: Target): Promise<TargetModel> {
    const model = new TargetModel(
      uuid(),
      target.name,
      target.type,
      target.host,
      target.port,
      new Date(),
      new Date(),
    );

    this.targets.push(model);

    return model;
  }

  async findById(id: string): Promise<TargetModel | undefined> {
    const model = this.targets.find((target) => target.id === id);

    return model;
  }

  async findByName(name: string): Promise<TargetModel | undefined> {
    const model = this.targets.find((targets) => targets.name === name);

    return model;
  }

  async findMany(): Promise<TargetModel[]> {
    return this.targets;
  }

  async update(id: string, updatedTarget: Target): Promise<TargetModel> {
    const modelIndex = this.targets.findIndex((target) => target.id === id);

    const model = this.targets[modelIndex];
    const updatedModel = new TargetModel(
      model.id,
      updatedTarget.name,
      updatedTarget.type,
      updatedTarget.host,
      updatedTarget.port,
      model.createdAt,
      new Date(),
    );

    this.targets[modelIndex] = updatedModel;

    return this.targets[modelIndex];
  }

  async remove(id: string): Promise<void> {
    const modelIndex = this.targets.findIndex((target) => target.id === id);

    if (modelIndex !== -1) {
      this.targets.splice(modelIndex, 1);
    } else {
      throw new TargetIdNotFoundError();
    }
  }
}
