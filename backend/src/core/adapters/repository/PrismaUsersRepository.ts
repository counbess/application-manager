import { v4 as uuid } from 'uuid';

import { PrismaClient, UserRole as PrismaUserRole, User as PrismaUser } from '@prisma/client';
import { UserRole } from '~/core/common/interfaces/user-role';
import { User } from '~/core/domain/entities/user/User';
import { UserModel, UsersRepository } from '~/core/domain/repository/Users';

export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaClient) {
    if (!prisma) {
      throw new Error();
    }
  }

  private static resolveRole(role: PrismaUserRole): UserRole {
    if (role === 'ADMINISTRATOR') {
      return UserRole.ADMINISTRATOR;
    }

    if (role === 'LEADER') {
      return UserRole.LEADER;
    }

    return UserRole.DEVELOPER;
  }

  private static parse(user: PrismaUser): UserModel {
    return {
      id: user.id,
      username: user.username,
      role: PrismaUsersRepository.resolveRole(user.role),
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  async add(user: User): Promise<UserModel> {
    const id = uuid();
    const { username, role } = user;
    const now = new Date();

    const createdUser = await this.prisma.user.create({
      data: {
        id, username, role, createdAt: now, updatedAt: now,
      },
    });

    return PrismaUsersRepository.parse(createdUser);
  }

  async findById(id: string): Promise<UserModel | undefined> {
    const user = await this.prisma.user.findFirst({ where: { id } });

    if (!user) {
      return undefined;
    }

    return PrismaUsersRepository.parse(user);
  }

  async findByUsername(username: string): Promise<UserModel | undefined> {
    const user = await this.prisma.user.findFirst({ where: { username } });

    if (!user) {
      return undefined;
    }

    return PrismaUsersRepository.parse(user);
  }

  async findMany(): Promise<UserModel[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => PrismaUsersRepository.parse(user));
  }

  async updateUserRole(id: string, newRole: UserRole): Promise<UserModel> {
    const now = new Date();
    const user = await this.prisma.user.update({
      where: { id },
      data: { role: newRole, updatedAt: now },
    });

    return PrismaUsersRepository.parse(user);
  }

  async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
