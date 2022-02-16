/* eslint-disable no-new */
import { Consumer } from './Consumer';
import { InvalidConsumerDescriptionError } from './errors/InvalidConsumerDescriptionError';
import { InvalidConsumerNameError } from './errors/InvalidConsumerNameError';
import { MissingConsumerDescriptionError } from './errors/MissingConsumerDescriptionError';
import { MissingConsumerNameError } from './errors/MissingConsumerNameError';

it('should be able to create a consumer', () => {
  const consumer = new Consumer('name', 'description');

  expect(consumer).toBeDefined();
});

it('not should be able to create a consumer without name', () => {
  function execution() {
    new Consumer(undefined as unknown as string, 'description');
  }

  expect(execution).toThrow(MissingConsumerNameError);
});

it('not should be able to create a consumer with a invalid name', () => {
  function execution() {
    new Consumer(1 as unknown as string, 'description');
  }

  expect(execution).toThrow(InvalidConsumerNameError);
});

it('not should be able to create a consumer without description', () => {
  function execution() {
    new Consumer('name', undefined as unknown as string);
  }

  expect(execution).toThrow(MissingConsumerDescriptionError);
});

it('not should be able to create a consumer with a invalid description', () => {
  function execution() {
    new Consumer('name', 1 as unknown as string);
  }

  expect(execution).toThrow(InvalidConsumerDescriptionError);
});
