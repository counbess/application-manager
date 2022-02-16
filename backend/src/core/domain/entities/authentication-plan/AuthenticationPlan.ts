import { validate, version } from 'uuid';

import { Consumer } from '../consumer/Consumer';

import { InvalidAuthenticationPlanConsumerError } from './errors/InvalidAuthenticationPlanConsumerError';
import { InvalidAuthenticationPlanKeyError } from './errors/InvalidAuthenticationPlanKeyError';
import { InvalidAuthenticationPlanKeyFormatError } from './errors/InvalidAuthenticationPlanKeyFormatError';
import { MissingAuthenticationPlanConsumerError } from './errors/MissingAuthenticationPlanConsumerError';
import { MissingAuthenticationPlanKeyError } from './errors/MissingAuthenticationPlanKeyError';

export class AuthenticationPlan {
  constructor(readonly consumer: Consumer, readonly key: string) {
    if (!consumer) {
      throw new MissingAuthenticationPlanConsumerError();
    } else if (!(consumer instanceof Consumer)) {
      throw new InvalidAuthenticationPlanConsumerError();
    }

    if (!key) {
      throw new MissingAuthenticationPlanKeyError();
    } else if (typeof key !== 'string') {
      throw new InvalidAuthenticationPlanKeyError();
    } else if (!validate(key) || version(key) !== 4) {
      throw new InvalidAuthenticationPlanKeyFormatError();
    }
  }
}
