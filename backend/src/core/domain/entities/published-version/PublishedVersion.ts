import { PublishType } from '~/core/common/interfaces/publish-type';
import { Coverage } from '../coverage/Coverage';
import { User } from '../user/User';
import { Version } from '../version/Version';
import { InvalidPublishedVersionPublisherError } from './errors/InvalidPublishedVersionPublisherError';
import { InvalidPublishedVersionPublishTypeError } from './errors/InvalidPublishedVersionPublishTypeError';
import { MissingPublishedVersionPublisherError } from './errors/MissingPublishedVersionPublisherError';
import { MissingPublishedVersionPublishTypeError } from './errors/MissingPublishedVersionPublishTypeError';

export class PublishedVersion extends Version {
  constructor(
    number: string,
    totalCoverage: Coverage,
    filesCoverage: Map<string, Coverage>,
    readonly publisher: User,
    readonly type: PublishType,
  ) {
    super(number, totalCoverage, filesCoverage);

    if (!publisher) {
      throw new MissingPublishedVersionPublisherError();
    } else if (!(publisher instanceof User)) {
      throw new InvalidPublishedVersionPublisherError();
    }

    if (!type) {
      throw new MissingPublishedVersionPublishTypeError();
    } else if (type !== PublishType.ROLLBACK && type !== PublishType.UPGRADE) {
      throw new InvalidPublishedVersionPublishTypeError();
    }
  }
}
