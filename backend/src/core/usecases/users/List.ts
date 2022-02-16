import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { isUsersRepository, UsersRepository } from '~/core/domain/repository/Users';
import { Intent } from '~/core/common/interfaces/intent';
import { UseCase } from '~/core/common/interfaces/usecase';
import { UserRole } from '~/core/common/interfaces/user-role';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';

export type ListUsersDTOOutput = {
  id: string
  username: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}[]

export class ListUsersUseCase implements UseCase<undefined, ListUsersDTOOutput> {
  constructor(private readonly repository: UsersRepository) {
    if (!repository) {
      throw new MissingUsersRepositoryError();
    } else if (!isUsersRepository(repository)) {
      throw new InvalidUsersRepositoryError();
    }

    this.repository = repository;
  }

  async execute(intent: Intent<undefined>): Promise<ListUsersDTOOutput> {
    const { emitter } = intent;

    if (emitter.role === UserRole.DEVELOPER) {
      throw new UnauthorizedError();
    }

    const users = await this.repository.findMany();

    return users;
  }
}
