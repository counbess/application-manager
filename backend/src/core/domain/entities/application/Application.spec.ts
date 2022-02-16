/* eslint-disable no-new */
import { InvalidApplicationNameError } from './errors/InvalidApplicationNameError';
import { MissingApplicationNameError } from './errors/MissingApplicationNameError';
import { MissingApplicationOwnerError } from './errors/MissingApplicationOwnerError';
import { InvalidApplicationOwnerError } from './errors/InvalidApplicationOwnerError';
import { Application } from './Application';
import { User } from '../user/User';
import { UserRole } from '~/core/common/interfaces/user-role';
import { MissingApplicationRepositoryURLError } from './errors/MissingApplicationRepositoryURLError';
import { InvalidApplicationRepositoryURLError } from './errors/InvalidApplicationRepositoryURLError';

const owner = new User('username', UserRole.DEVELOPER);

it('should be able to create a application', () => {
  const application = new Application('application-name', owner, 'http://example.git');

  expect(application).toBeDefined();
});

it('not should be able to create a application without name', () => {
  function execution() {
    new Application(undefined as unknown as string, owner, 'http://example.git');
  }

  expect(execution).toThrowError(MissingApplicationNameError);
});

it('not should be able to create a application with invalid name', () => {
  function execution() {
    new Application(1 as unknown as string, owner, 'http://example.git');
  }

  expect(execution).toThrowError(InvalidApplicationNameError);
});

it('not should be able to create a application without owner', () => {
  function execution() {
    new Application('application-name', undefined as unknown as User, 'http://example.git');
  }

  expect(execution).toThrowError(MissingApplicationOwnerError);
});

it('not should be able to create a application with invalid owner', () => {
  function execution() {
    new Application('application-name', 'owner' as unknown as User, 'http://example.git');
  }

  expect(execution).toThrowError(InvalidApplicationOwnerError);
});

it('not should be able to create a application without repository url', () => {
  function execution() {
    new Application('application-name', owner, undefined as unknown as string)
  }

  expect(execution).toThrowError(MissingApplicationRepositoryURLError)
})

it('not should be able to create a application with invalid repository url', () => {
  function execution() {
    new Application('application-name', owner, {} as unknown as string)
  }

  expect(execution).toThrowError(InvalidApplicationRepositoryURLError)
})
