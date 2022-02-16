import { Intent } from './intent';

export interface UseCase<Input, Output> {
  execute(intent: Intent<Input>): Promise<Output>
}
