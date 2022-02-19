import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { Intent } from '~/core/common/interfaces/intent';
import { UseCase } from '~/core/common/interfaces/usecase';
import { UserRole } from '~/core/common/interfaces/user-role';
import { Scope } from '~/core/domain/entities/scope/Scope';
import { Target } from '~/core/domain/entities/target/Target';
import { isScopesRepository, ScopesRepository } from '~/core/domain/repository/Scopes';
import { InvalidScopesRepositoryError } from './errors/InvalidScopesRepositoryError';
import { MissingScopesRepositoryError } from './errors/MissingScopesRepositoryError';
import { NameAlreadyExistsError } from './errors/NameAlreadyExistsError';

export interface AddScopeDTOInput {
  name: string
  target: Target
}

export interface AddScopeDTOOutput {
  id: string
  name: string
  target: Target
  createdAt: Date
  updatedAt: Date
}

export class AddScopeUseCase implements UseCase<AddScopeDTOInput, AddScopeDTOOutput> {
  constructor(private readonly repository: ScopesRepository) {
    if (!repository) {
      throw new MissingScopesRepositoryError();
    } else if (!isScopesRepository(repository)) {
      throw new InvalidScopesRepositoryError();
    }

    this.repository = repository;
  }

  async execute(intent: Intent<AddScopeDTOInput>): Promise<AddScopeDTOOutput> {
    const { payload, emitter } = intent;

    if (emitter.role !== UserRole.ADMINISTRATOR) {
      throw new UnauthorizedError();
    }

    const nameAlreadyExists = await this.repository.findByName(payload.name);

    if (nameAlreadyExists) {
      throw new NameAlreadyExistsError();
    }

    const output = await this.repository.add(
      new Scope(payload.name, payload.target),
    );

    return {
      id: output.id,
      name: output.name,
      target: output.target,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
