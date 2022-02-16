/* eslint-disable no-new */
import { InvalidTargetPortError } from './errors/InvalidTargetPortError';
import { MissingTargetPortError } from './errors/MissingTargetPortError';
import { InvalidTargetHostError } from './errors/InvalidTargetHostError';
import { MissingTargetHostError } from './errors/MissingTargetHostError';
import { InvalidTargetTypeError } from './errors/InvalidTargetTypeError';
import { MissingTargetTypeError } from './errors/MissingTargetTypeError';
import { InvalidTargetNameError } from './errors/InvalidTargetNameError';
import { MissingTargetNameError } from './errors/MissingTargetNameError';
import { Target, TargetTypes } from './Target';

it('not should be able to create a target without name', () => {
  function execution() {
    new Target(undefined as unknown as string, TargetTypes.HOMOLOGATION, '127.0.0.1', 8080);
  }
  expect(execution).toThrowError(MissingTargetNameError);
});

it('not should be able to create a target with invalid name', () => {
  function execution() {
    new Target(1 as unknown as string, TargetTypes.HOMOLOGATION, '127.0.0.1', 8080);
  }
  expect(execution).toThrowError(InvalidTargetNameError);
});

it('not should be able to create a target without type', () => {
  function execution() {
    new Target('custom-target', undefined as unknown as TargetTypes, '127.0.0.1', 8080);
  }
  expect(execution).toThrowError(MissingTargetTypeError);
});

it('not should be able to create a target with invalid type', () => {
  function execution() {
    new Target('custom-target', 1 as unknown as TargetTypes, '127.0.0.1', 8080);
  }
  expect(execution).toThrowError(InvalidTargetTypeError);
});

it('not should be able to create a target without host', () => {
  function execution() {
    new Target('custom-target', TargetTypes.HOMOLOGATION, undefined as unknown as string, 8080);
  }
  expect(execution).toThrowError(MissingTargetHostError);
});

it('not should be able to create a target with invalid host', () => {
  function execution() {
    new Target('custom-target', TargetTypes.HOMOLOGATION, 1 as unknown as string, 8080);
  }
  expect(execution).toThrowError(InvalidTargetHostError);
});

it('not should be able to create a target without port', () => {
  function execution() {
    new Target('custom-target', TargetTypes.HOMOLOGATION, '127.0.0.1', undefined as unknown as number);
  }
  expect(execution).toThrowError(MissingTargetPortError);
});

it('not should be able to create a target with invalid port', () => {
  function execution() {
    new Target('custom-target', TargetTypes.HOMOLOGATION, '127.0.0.1', '1' as unknown as number);
  }
  expect(execution).toThrowError(InvalidTargetPortError);
});

it('should be able to create a target with port as 0', () => {
  const target = new Target('custom-target', TargetTypes.HOMOLOGATION, '127.0.0.1', 0);

  expect(target).toBeDefined();
});

it('should be able to create a target with port as less than 0', () => {
  function execution() {
    new Target('custom-target', TargetTypes.HOMOLOGATION, '127.0.0.1', -1);
  }
  expect(execution).toThrowError(InvalidTargetPortError);
});

it('should be able to create a target', () => {
  const target = new Target('custom-target', TargetTypes.HOMOLOGATION, '127.0.0.1', 8080);

  expect(target).toBeDefined();
});
