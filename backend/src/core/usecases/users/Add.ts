import { UnauthorizedError } from '~/core/common/errors/UnauthorizedError';
import { User } from '~/core/domain/entities/user/User';
import { isUsersRepository, UsersRepository } from '~/core/domain/repository/Users';
import { Intent } from '~/core/common/interfaces/intent';
import { UseCase } from '~/core/common/interfaces/usecase';
import { UserRole } from '~/core/common/interfaces/user-role';
import { UsernameAlreadyExistsError } from './errors/UsernameAlreadyExistsError';
import { FindUserByUsernameUseCase } from './FindByUsername';
import { MissingUsersRepositoryError } from './errors/MissingUsersRepositoryError';
import { InvalidUsersRepositoryError } from './errors/InvalidUsersRepositoryError';

export interface AddUserDTOInput {
  username: string
  role: UserRole
}

export interface AddUserDTOOutput {
  id: string
  username: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
}

export class AddUserUseCase implements UseCase<AddUserDTOInput, AddUserDTOOutput> {
  constructor(private readonly repository: UsersRepository) {
    if (!repository) {
      throw new MissingUsersRepositoryError();
    } else if (!isUsersRepository(repository)) {
      throw new InvalidUsersRepositoryError();
    }

    this.repository = repository;
  }

  async execute(intent: Intent<AddUserDTOInput>): Promise<AddUserDTOOutput> {
    const { payload, emitter } = intent;

    if (emitter.role === UserRole.DEVELOPER) {
      throw new UnauthorizedError();
    }

    if (emitter.role === UserRole.LEADER && payload.role !== UserRole.DEVELOPER) {
      throw new UnauthorizedError();
    }

    const findUserByUsernameUseCase = new FindUserByUsernameUseCase(this.repository);
    const user = await findUserByUsernameUseCase.execute({
      emitter,
      payload: { username: payload.username },
    });

    if (user) {
      throw new UsernameAlreadyExistsError();
    }

    const output = await this.repository.add(
      new User(payload.username, payload.role),
    );

    return {
      id: output.id,
      username: output.username,
      role: output.role,
      createdAt: output.createdAt,
      updatedAt: output.updatedAt,
    };
  }
}
