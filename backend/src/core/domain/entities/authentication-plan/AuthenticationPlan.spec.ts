/* eslint-disable no-new */
import { v4 as uuid } from 'uuid';

import { Consumer } from '../consumer/Consumer';
import { AuthenticationPlan } from './AuthenticationPlan';
import { InvalidAuthenticationPlanConsumerError } from './errors/InvalidAuthenticationPlanConsumerError';
import { InvalidAuthenticationPlanKeyError } from './errors/InvalidAuthenticationPlanKeyError';
import { InvalidAuthenticationPlanKeyFormatError } from './errors/InvalidAuthenticationPlanKeyFormatError';
import { MissingAuthenticationPlanConsumerError } from './errors/MissingAuthenticationPlanConsumerError';
import { MissingAuthenticationPlanKeyError } from './errors/MissingAuthenticationPlanKeyError';

const consumer = new Consumer('name', 'description');

it('should be able to create a AuthenticationPlan', () => {
  const authPlan = new AuthenticationPlan(consumer, uuid());

  expect(authPlan).toBeDefined();
});

it('not should be able to create a authentication plan without consumer', () => {
  function execution() {
    new AuthenticationPlan(undefined as unknown as Consumer, uuid());
  }

  expect(execution).toThrowError(MissingAuthenticationPlanConsumerError);
});

it('not should be able to create a authentication plan with a invalid consumer', () => {
  function execution() {
    new AuthenticationPlan('consumer' as unknown as Consumer, uuid());
  }

  expect(execution).toThrowError(InvalidAuthenticationPlanConsumerError);
});

it('not should be able to create a authentication plan without a key', () => {
  function execution() {
    new AuthenticationPlan(consumer, undefined as unknown as string);
  }

  expect(execution).toThrowError(MissingAuthenticationPlanKeyError);
});

it('not should be able to create a authentication plan with a invalid key', () => {
  function execution() {
    new AuthenticationPlan(consumer, 1 as unknown as string);
  }

  expect(execution).toThrowError(InvalidAuthenticationPlanKeyError);
});

it('not should be able to create a authentication plan with a invalid key format', () => {
  function execution() {
    new AuthenticationPlan(consumer, 'uuid');
  }

  expect(execution).toThrowError(InvalidAuthenticationPlanKeyFormatError);
});
