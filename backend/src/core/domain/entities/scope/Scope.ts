import semver from 'semver';

import { InvalidScopeTargetError } from './errors/InvalidScopeTargetError';
import { MissingScopeTargetError } from './errors/MissingScopeTargetError';
import { InvalidScopeNameError } from './errors/InvalidScopeNameError';
import { MissingScopeNameError } from './errors/MissingScopeNameError';
import { DuplicateEnvironmentVariableInScopeError } from './errors/DuplicateEnvironmentVariableInScopeError';
import { MissingEnvironmentVariableInScopeError } from './errors/MissingEnvironmentVariableInScopeError';
import { InvalidEnvironmentVariableFormatInScopeError } from './errors/InvalidEnvironmentVariableFormatInScopeError';
import { VersionCurrentlyAppliedInScopeError } from './errors/VersionCurrentlyAppliedInScopeError';
import { Target } from '../target/Target';
import { Version } from '../version/Version';
import { User } from '../user/User';
import { PublishedVersion } from '../published-version/PublishedVersion';
import { PublishType } from '~/core/common/interfaces/publish-type';

function isValidEnvironmentVariableKey(key: string) {
  return /([A-Z0-9])*_?([A-Z0-9])/g.test(key);
}
export class Scope {
  private readonly environmentVariables = new Map<string, string>();

  private appliedVersion: PublishedVersion | undefined;

  private versionHistory: PublishedVersion[] = [];

  constructor(
    readonly name: string,
    readonly target: Target,
  ) {
    if (!name) {
      throw new MissingScopeNameError();
    } else if (typeof name !== 'string') {
      throw new InvalidScopeNameError();
    }

    if (!target) {
      throw new MissingScopeTargetError();
    } else if (!(target instanceof Target)) {
      throw new InvalidScopeTargetError();
    }
  }

  addEnvironmentVariable(key: string, value: string) {
    const alreadyExists = this.environmentVariables.has(key);

    if (alreadyExists) {
      throw new DuplicateEnvironmentVariableInScopeError();
    } else if (isValidEnvironmentVariableKey(key)) {
      this.environmentVariables.set(key, value);
    } else {
      throw new InvalidEnvironmentVariableFormatInScopeError();
    }
  }

  getEnvironmentVariable(key: string) {
    const value = this.environmentVariables.get(key);

    if (!value) {
      throw new MissingEnvironmentVariableInScopeError();
    }

    return value;
  }

  updateEnvironmentVariable(key: string, value: string) {
    const hasKey = this.environmentVariables.has(key);

    if (!hasKey) {
      throw new MissingEnvironmentVariableInScopeError();
    }

    this.environmentVariables.set(key, value);
  }

  removeEnvironmentVariable(key: string) {
    const hasKey = this.environmentVariables.has(key);

    if (!hasKey) {
      throw new MissingEnvironmentVariableInScopeError();
    }

    this.environmentVariables.delete(key);
  }

  getAppliedVersion() {
    return this.appliedVersion;
  }

  getPublishedVersionHistory() {
    return this.versionHistory;
  }

  publishVersion(version: Version, publisher: User) {
    let isRollback = false;

    if (this.appliedVersion) {
      if (semver.eq(version.number, this.appliedVersion.number)) {
        throw new VersionCurrentlyAppliedInScopeError();
      }

      isRollback = semver.lt(version.number, this.appliedVersion.number);
    }

    this.appliedVersion = new PublishedVersion(
      version.number,
      version.totalCoverage,
      version.filesCoverage,
      publisher,
      PublishType.UPGRADE,
    );

    this.versionHistory.push(new PublishedVersion(
      version.number,
      version.totalCoverage,
      version.filesCoverage,
      publisher,
      isRollback ? PublishType.ROLLBACK : PublishType.UPGRADE,
    ));
  }

  rollbackVersion(publisher: User) {
    const { appliedVersion } = this;
    if (!appliedVersion) return;

    const lastHistoryVersion = this.versionHistory.filter(
      (version) => version.type === PublishType.UPGRADE
      && semver.lt(version.number, appliedVersion.number),
    ).reverse()[0];

    if (!lastHistoryVersion) return;

    this.publishVersion(lastHistoryVersion, publisher);
  }
}
