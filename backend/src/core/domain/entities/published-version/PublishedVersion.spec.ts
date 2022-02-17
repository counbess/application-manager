/* eslint-disable no-new */
import { PublishType } from '~/core/common/interfaces/publish-type';
import { UserRole } from '~/core/common/interfaces/user-role';
import { CoverageItem } from '../coverage-item/CoverageItem';
import { Coverage } from '../coverage/Coverage';
import { User } from '../user/User';
import { InvalidPublishedVersionPublisherError } from './errors/InvalidPublishedVersionPublisherError';
import { InvalidPublishedVersionPublishTypeError } from './errors/InvalidPublishedVersionPublishTypeError';
import { MissingPublishedVersionPublisherError } from './errors/MissingPublishedVersionPublisherError';
import { MissingPublishedVersionPublishTypeError } from './errors/MissingPublishedVersionPublishTypeError';
import { PublishedVersion } from './PublishedVersion';

const totalCoverage = new Coverage(
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
);

const filesCoverage = new Map<string, Coverage>();

it('should be able to create a PublishedVersion', () => {
  const publisher = new User('username', UserRole.DEVELOPER);
  const version = new PublishedVersion('1.0.0', totalCoverage, filesCoverage, publisher, PublishType.UPGRADE);

  expect(version).toBeDefined();
});

it('not should be able to create a PublishedVersion without publisher', () => {
  function execution() {
    new PublishedVersion('1.0.0', totalCoverage, filesCoverage, undefined as unknown as User, PublishType.UPGRADE);
  }
  expect(execution).toThrowError(MissingPublishedVersionPublisherError);
});

it('not should be able to create a PublishedVersion with a invalid publisher', () => {
  function execution() {
    new PublishedVersion('1.0.0', totalCoverage, filesCoverage, 'publisher' as unknown as User, PublishType.UPGRADE);
  }
  expect(execution).toThrowError(InvalidPublishedVersionPublisherError);
});

it('not should be able to create a PublishedVersion without publisher', () => {
  function execution() {
    const publisher = new User('username', UserRole.DEVELOPER);
    new PublishedVersion('1.0.0', totalCoverage, filesCoverage, publisher, undefined as unknown as PublishType);
  }
  expect(execution).toThrowError(MissingPublishedVersionPublishTypeError);
});

it('not should be able to create a PublishedVersion with a invalid publisher', () => {
  function execution() {
    const publisher = new User('username', UserRole.DEVELOPER);
    new PublishedVersion('1.0.0', totalCoverage, filesCoverage, publisher, {} as unknown as PublishType);
  }
  expect(execution).toThrowError(InvalidPublishedVersionPublishTypeError);
});
