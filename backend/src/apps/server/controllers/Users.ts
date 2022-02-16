import { Request, Response } from 'express';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '~/core/domain/entities/user/User';
import { Factory } from '~/core/domain/factory/Factory';
import { AddUserDTOInput, AddUserUseCase } from '~/core/usecases/users/Add';
import { ListUsersUseCase } from '~/core/usecases/users/List';

export class UsersController {
  private addUserUseCase: AddUserUseCase;

  private listUsersUseCase: ListUsersUseCase;

  constructor(factory: Factory) {
    this.addUserUseCase = new AddUserUseCase(factory.usersRepository);
    this.listUsersUseCase = new ListUsersUseCase(factory.usersRepository);
  }

  async handleAddUserRequest(request: Request, response: Response) {
    const { body } = request;
    const payload = body as AddUserDTOInput;

    const user = await this.addUserUseCase.execute({
      emitter: new User('admin', UserRole.ADMINISTRATOR),
      payload,
    });

    response.json(user);
  }

  async handleListUsersRequest(_request: Request, response: Response) {
    const users = await this.listUsersUseCase.execute({
      emitter: new User('admin', UserRole.ADMINISTRATOR),
      payload: undefined,
    });

    response.json(users);
  }
}
