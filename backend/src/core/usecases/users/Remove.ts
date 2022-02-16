import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { isUsersRepository, UsersRepository } from '~/core/domain/repository/Users';
import { Intent } from '~/core/common/interfaces/intent';
import { UseCase } from '~/core/common/interfaces/usecase';
import { UserRole } from '~/core/common/interfaces/user-role';
import { UserIdNotFoundError } from './errors/UserIdNotFoundError';
import { FindUserByIdUseCase } from './FindById';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';

export interface RemoveUserDTOInput {
  id: string
}

export class RemoveUserUseCase implements UseCase<RemoveUserDTOInput, void> {
  constructor(private readonly repository: UsersRepository) {
    if (!repository) {
      throw new MissingUsersRepositoryError();
    } else if (!isUsersRepository(repository)) {
      throw new InvalidUsersRepositoryError();
    }

    this.repository = repository;
  }

  async execute(intent: Intent<RemoveUserDTOInput>): Promise<void> {
    const { emitter, payload } = intent;

    if (emitter.role === UserRole.DEVELOPER) {
      throw new UnauthorizedError();
    }

    const findUserByIdUseCase = new FindUserByIdUseCase(this.repository);
    const user = await findUserByIdUseCase.execute({
      emitter,
      payload: { id: payload.id },
    });

    if (!user) {
      throw new UserIdNotFoundError();
    }

    if (emitter.role === UserRole.LEADER && user.role !== UserRole.DEVELOPER) {
      throw new UnauthorizedError();
    }

    await this.repository.remove(payload.id);
  }
}
