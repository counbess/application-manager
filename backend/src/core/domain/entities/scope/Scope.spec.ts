/* eslint-disable no-new */
import { Scope } from './Scope';
import { InvalidScopeTargetError } from './errors/InvalidScopeTargetError';
import { MissingScopeTargetError } from './errors/MissingScopeTargetError';
import { InvalidScopeNameError } from './errors/InvalidScopeNameError';
import { MissingScopeNameError } from './errors/MissingScopeNameError';
import { Target, TargetTypes } from '../target/Target';
import { DuplicateEnvironmentVariableInScopeError } from './errors/DuplicateEnvironmentVariableInScopeError';
import { MissingEnvironmentVariableInScopeError } from './errors/MissingEnvironmentVariableInScopeError';
import { InvalidEnvironmentVariableFormatInScopeError } from './errors/InvalidEnvironmentVariableFormatInScopeError';
import { Version } from '../version/Version';
import { Coverage } from '../coverage/Coverage';
import { CoverageItem } from '../coverage-item/CoverageItem';
import { User } from '../user/User';
import { VersionCurrentlyAppliedInScopeError } from './errors/VersionCurrentlyAppliedInScopeError';
import { UserRole } from '~/core/common/interfaces/user-role';

const target = new Target('target', TargetTypes.DEVELOPMENT, '127.0.0.1', 8080);

const totalCoverage = new Coverage(
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
);

it('should be able to create a scope', () => {
  const scope = new Scope('custom-scope', target);

  const appliedVersion = scope.getAppliedVersion();

  expect(scope).toBeDefined();
  expect(appliedVersion).toBeUndefined();
});

it('should be able to publish a version in the scope', () => {
  const scope = new Scope('custom-scope', target);
  const version = new Version('1.0.0', totalCoverage, new Map());
  const publisher = new User('username', UserRole.DEVELOPER);

  scope.publishVersion(version, publisher);

  const appliedVersion = scope.getAppliedVersion();

  expect(scope).toBeDefined();
  expect(appliedVersion).toBeDefined();
});

it('not should be able to publish same version some times in the scope', () => {
  function execution() {
    const scope = new Scope('custom-scope', target);
    const version = new Version('1.0.0', totalCoverage, new Map());
    const publisher = new User('username', UserRole.DEVELOPER);

    scope.publishVersion(version, publisher);

    const appliedVersion = scope.getAppliedVersion();

    expect(scope).toBeDefined();
    expect(appliedVersion).toBeDefined();

    scope.publishVersion(version, publisher);
  }

  expect(execution).toThrowError(VersionCurrentlyAppliedInScopeError);
});

it('should be able to access version history when some versions are published in a scope', () => {
  const scope = new Scope('scope-name', target);
  const firstVersion = new Version('1.0.0', totalCoverage, new Map());
  const publisher = new User('username', UserRole.DEVELOPER);

  scope.publishVersion(firstVersion, publisher);

  let appliedVersion = scope.getAppliedVersion();

  expect(appliedVersion).toBeDefined();
  expect(appliedVersion?.number).toBe(firstVersion.number);

  const secondVersion = new Version('1.0.1', totalCoverage, new Map());

  scope.publishVersion(secondVersion, publisher);

  appliedVersion = scope.getAppliedVersion();

  expect(appliedVersion).toBeDefined();
  expect(appliedVersion?.number).toBe(secondVersion.number);

  const versionHistory = scope.getPublishedVersionHistory();

  expect(versionHistory).toBeDefined();
  expect(versionHistory.length).toBe(1);
  expect(versionHistory[0].number).toBe(firstVersion.number);
});

it('not should be able to create a scope without name', () => {
  function execution() {
    new Scope(undefined as unknown as string, target);
  }

  expect(execution).toThrowError(MissingScopeNameError);
});

it('not should be able to create a scope with invalid name', () => {
  function execution() {
    new Scope(1 as unknown as string, target);
  }

  expect(execution).toThrowError(InvalidScopeNameError);
});

it('not should be able to create a scope without target', () => {
  function execution() {
    new Scope('custom-scope', undefined as unknown as Target);
  }

  expect(execution).toThrowError(MissingScopeTargetError);
});

it('not should be able to create a scope with invalid target', () => {
  function execution() {
    new Scope('custom-scope', 1 as unknown as Target);
  }

  expect(execution).toThrowError(InvalidScopeTargetError);
});

it('should be able to add a environment variable to a scope and access her', () => {
  const scope = new Scope('custom-scope', target);

  scope.addEnvironmentVariable('NODE_ENV', 'development');

  const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

  expect(NODE_ENV).toBe('development');
});

it('not should be able to add a environment variable with invalid key in the scope', () => {
  function execution() {
    const scope = new Scope('scope-name', target);
    scope.addEnvironmentVariable('node-env', 'development');

    const nodeEnv = scope.getEnvironmentVariable('node-env');

    expect(nodeEnv).toBe('node-env');
  }

  expect(execution).toThrowError(InvalidEnvironmentVariableFormatInScopeError);
});

it('should be able to add same environment variable some times to a scope and access her', () => {
  function execution() {
    const scope = new Scope('custom-scope', target);

    scope.addEnvironmentVariable('NODE_ENV', 'development');

    const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

    expect(NODE_ENV).toBe('development');

    scope.addEnvironmentVariable('NODE_ENV', 'development');
  }

  expect(execution).toThrowError(DuplicateEnvironmentVariableInScopeError);
});

it('not should be able to get a environment variable when her not in the scope', () => {
  function execution() {
    const scope = new Scope('custom-scope', target);

    const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

    expect(NODE_ENV).toBeDefined();
  }

  expect(execution).toThrowError(MissingEnvironmentVariableInScopeError);
});

it('should be able to update a existing environment variable with invalid key in the scope', () => {
  const scope = new Scope('scope-name', target);

  scope.addEnvironmentVariable('NODE_ENV', 'development');
  scope.updateEnvironmentVariable('NODE_ENV', 'production');

  const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

  expect(NODE_ENV).toBe('production');
});

it('not should be able to update a environment variable when her not in the scope', () => {
  function execution() {
    const scope = new Scope('scope-name', target);

    scope.updateEnvironmentVariable('NODE_ENV', 'development');

    const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

    expect(NODE_ENV).toBe('development');
  }

  expect(execution).toThrowError(MissingEnvironmentVariableInScopeError);
});

it('should be able to remove a existing environment variable on the scope', () => {
  function execution() {
    const scope = new Scope('scope-name', target);

    scope.addEnvironmentVariable('NODE_ENV', 'development');
    scope.removeEnvironmentVariable('NODE_ENV');

    const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

    expect(NODE_ENV).toBe('development');
  }

  expect(execution).toThrowError(MissingEnvironmentVariableInScopeError);
});

it('not should be able to remove environment variable when her not in scope', () => {
  function execution() {
    const scope = new Scope('scope-name', target);

    scope.removeEnvironmentVariable('NODE_ENV');

    const NODE_ENV = scope.getEnvironmentVariable('NODE_ENV');

    expect(NODE_ENV).toBe('development');
  }

  expect(execution).toThrowError(MissingEnvironmentVariableInScopeError);
});
