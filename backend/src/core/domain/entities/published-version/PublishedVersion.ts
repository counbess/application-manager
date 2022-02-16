import { Coverage } from '../coverage/Coverage';
import { User } from '../user/User';
import { Version } from '../version/Version';
import { InvalidPublishedVersionPublisherError } from './errors/InvalidPublishedVersionPublisherError';
import { MissingPublishedVersionPublisherError } from './errors/MissingPublishedVersionPublisherError';

export class PublishedVersion extends Version {
  constructor(
    number: string,
    totalCoverage: Coverage,
    filesCoverage: Map<string, Coverage>,
    readonly publisher: User,
  ) {
    super(number, totalCoverage, filesCoverage);

    if (!publisher) {
      throw new MissingPublishedVersionPublisherError();
    } else if (!(publisher instanceof User)) {
      throw new InvalidPublishedVersionPublisherError();
    }
  }
}
