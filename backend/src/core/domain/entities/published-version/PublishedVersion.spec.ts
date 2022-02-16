/* eslint-disable no-new */
import { UserRole } from '~/core/common/interfaces/user-role';
import { CoverageItem } from '../coverage-item/CoverageItem';
import { Coverage } from '../coverage/Coverage';
import { User } from '../user/User';
import { InvalidPublishedVersionPublisherError } from './errors/InvalidPublishedVersionPublisherError';
import { MissingPublishedVersionPublisherError } from './errors/MissingPublishedVersionPublisherError';
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
  const version = new PublishedVersion('1.0.0', totalCoverage, filesCoverage, publisher);

  expect(version).toBeDefined();
});

it('not should be able to create a PublishedVersion without publisher', () => {
  function execution() {
    new PublishedVersion('1.0.0', totalCoverage, filesCoverage, undefined as unknown as User);
  }
  expect(execution).toThrowError(MissingPublishedVersionPublisherError);
});

it('not should be able to create a PublishedVersion with a invalid publisher', () => {
  function execution() {
    new PublishedVersion('1.0.0', totalCoverage, filesCoverage, 'publisher' as unknown as User);
  }
  expect(execution).toThrowError(InvalidPublishedVersionPublisherError);
});
