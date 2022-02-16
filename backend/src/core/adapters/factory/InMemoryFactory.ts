import { Factory } from '~/core/domain/factory/Factory';
import { InMemoryUsersRepository } from '../repository/InMemoryUsersRepository';

export class InMemoryFactory implements Factory {
  usersRepository = new InMemoryUsersRepository();
}
