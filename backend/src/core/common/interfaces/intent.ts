import { User } from '~/core/domain/entities/user/User';

export interface Intent<Payload> {
  payload: Payload
  emitter: User
}
