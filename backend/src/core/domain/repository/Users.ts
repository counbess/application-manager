import { Model } from '~/core/common/interfaces/model';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '../entities/user/User';

export class UserModel extends User implements Model {
  constructor(
    readonly id: string,
    readonly username: string,
    readonly role: UserRole,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super(username, role);
  }
}

export interface UsersRepository {
  add(user: User): Promise<UserModel>
  findById(id: string): Promise<UserModel | undefined>
  findByUsername(username: string): Promise<UserModel | undefined>
  findMany(): Promise<UserModel[]>
  updateUserRole(id: string, newRole: UserRole): Promise<UserModel>
  remove(id: string): Promise<void>
}

export function isUsersRepository(object: object): object is UsersRepository {
  const fakeRepo = object as UsersRepository;

  if (!fakeRepo.add || typeof fakeRepo.add !== 'function') {
    return false;
  }

  if (!fakeRepo.findById || typeof fakeRepo.findById !== 'function') {
    return false;
  }

  if (!fakeRepo.findByUsername || typeof fakeRepo.findByUsername !== 'function') {
    return false;
  }

  if (!fakeRepo.findMany || typeof fakeRepo.findMany !== 'function') {
    return false;
  }

  if (!fakeRepo.updateUserRole || typeof fakeRepo.updateUserRole !== 'function') {
    return false;
  }

  if (!fakeRepo.remove || typeof fakeRepo.remove !== 'function') {
    return false;
  }

  return true;
}
