import { InvalidConsumerDescriptionError } from './errors/InvalidConsumerDescriptionError';
import { InvalidConsumerNameError } from './errors/InvalidConsumerNameError';
import { MissingConsumerDescriptionError } from './errors/MissingConsumerDescriptionError';
import { MissingConsumerNameError } from './errors/MissingConsumerNameError';

export class Consumer {
  constructor(
    readonly name: string,
    readonly description: string,
  ) {
    if (!name) {
      throw new MissingConsumerNameError();
    } else if (typeof name !== 'string') {
      throw new InvalidConsumerNameError();
    }

    if (!description) {
      throw new MissingConsumerDescriptionError();
    } else if (typeof description !== 'string') {
      throw new InvalidConsumerDescriptionError();
    }
  }
}
