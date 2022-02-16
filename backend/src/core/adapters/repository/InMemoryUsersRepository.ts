import { v4 as uuid } from 'uuid';

import { User } from '~/core/domain/entities/user/User';
import { UserModel, UsersRepository } from '~/core/domain/repository/Users';
import { UserRole } from '~/core/common/interfaces/user-role';
import { UserIdNotFoundError } from '~/core/usecases/users/errors/UserIdNotFoundError';

export class InMemoryUsersRepository implements UsersRepository {
  private users: UserModel[] = [];

  async add(user: User): Promise<UserModel> {
    const model = new UserModel(uuid(), user.username, user.role, new Date(), new Date());

    this.users.push(model);

    return model;
  }

  async findById(id: string): Promise<UserModel | undefined> {
    const model = this.users.find((user) => user.id === id);

    return model;
  }

  async findByUsername(username: string): Promise<UserModel | undefined> {
    const model = this.users.find((user) => user.username === username);

    return model;
  }

  async findMany(): Promise<UserModel[]> {
    return this.users;
  }

  async updateUserRole(id: string, newRole: UserRole): Promise<UserModel> {
    const modelIndex = this.users.findIndex((user) => user.id === id);

    const model = this.users[modelIndex];
    const updatedModel = new UserModel(
      model.id,
      model.username,
      newRole,
      model.createdAt,
      new Date(),
    );

    this.users[modelIndex] = updatedModel;

    return this.users[modelIndex];
  }

  async remove(id: string): Promise<void> {
    const modelIndex = this.users.findIndex((user) => user.id === id);

    if (modelIndex !== -1) {
      this.users.splice(modelIndex, 1);
    } else {
      throw new UserIdNotFoundError();
    }
  }
}
