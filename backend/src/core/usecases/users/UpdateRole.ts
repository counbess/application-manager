import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { isUsersRepository, UsersRepository } from '~/core/domain/repository/Users';
import { Intent } from '~/core/common/interfaces/intent';
import { UseCase } from '~/core/common/interfaces/usecase';
import { UserRole } from '~/core/common/interfaces/user-role';
import { UserIdNotFoundError } from './errors/UserIdNotFoundError';
import { FindUserByIdUseCase } from './FindById';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';

export interface UpdateUserRoleDTOInput {
  id: string
  role: UserRole
}

export interface UpdateUserRoleDTOOutput {
  id: string
  username: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export class UpdateUserRoleUseCase
implements UseCase<UpdateUserRoleDTOInput, UpdateUserRoleDTOOutput> {
  constructor(private readonly repository: UsersRepository) {
    if (!repository) {
      throw new MissingUsersRepositoryError();
    } else if (!isUsersRepository(repository)) {
      throw new InvalidUsersRepositoryError();
    }

    this.repository = repository;
  }

  async execute(intent: Intent<UpdateUserRoleDTOInput>): Promise<UpdateUserRoleDTOOutput> {
    const { emitter, payload } = intent;

    if (emitter.role !== UserRole.ADMINISTRATOR) {
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

    const updatedUser = await this.repository.updateUserRole(payload.id, payload.role);

    return updatedUser;
  }
}
