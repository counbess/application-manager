import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { Intent } from '~/core/common/interfaces/intent';
import { UseCase } from '~/core/common/interfaces/usecase';
import { UserRole } from '~/core/common/interfaces/user-role';
import { Target, TargetTypes } from '~/core/domain/entities/target/Target';
import { isTargetsRepository, TargetsRepository } from '~/core/domain/repository/Targets';
import { InvalidTargetsRepositoryError } from './errors/InvalidTargetsRepositoryError';
import { MissingTargetsRepositoryError } from './errors/MissingTargetsRepositoryError';
import { NameAlreadyExistsError } from './errors/NameAlreadyExistsError';

export interface AddTargetDTOInput {
  name: string
  type: TargetTypes
  host: string
  port: number
}

export interface AddTargetDTOOutput {
  id: string
  name: string
  type: TargetTypes
  host: string
  port: number
  createdAt: Date
  updatedAt: Date
}

export class AddTargetUseCase implements UseCase<AddTargetDTOInput, AddTargetDTOOutput> {
  constructor(private readonly repository: TargetsRepository) {
    if (!repository) {
      throw new MissingTargetsRepositoryError();
    } else if (!isTargetsRepository(repository)) {
      throw new InvalidTargetsRepositoryError();
    }

    this.repository = repository;
  }

  async execute(intent: Intent<AddTargetDTOInput>): Promise<AddTargetDTOOutput> {
    const { payload, emitter } = intent;

    if (emitter.role !== UserRole.ADMINISTRATOR) {
      throw new UnauthorizedError();
    }

    const nameAlreadyExists = await this.repository.findByName(payload.name);

    if (nameAlreadyExists) {
      throw new NameAlreadyExistsError();
    }

    const output = await this.repository.add(
      new Target(payload.name, payload.type, payload.host, payload.port),
    );

    return {
      id: output.id,
      name: output.name,
      type: output.type,
      host: output.host,
      port: output.port,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
