/* eslint-disable no-new */
import { CoverageItem } from './CoverageItem';
import { InvalidCoverageItemSkippedError } from './errors/InvalidCoverageItemSkippedError';
import { MissingCoverageItemSkippedError } from './errors/MissingCoverageItemSkippedError';
import { InvalidCoverageItemCoveredError } from './errors/InvalidCoverageItemCoveredError';
import { MissingCoverageItemCoveredError } from './errors/MissingCoverageItemCoveredError';
import { InvalidCoverageItemTotalError } from './errors/InvalidCoverageItemTotalError';
import { MissingCoverageItemTotalError } from './errors/MissingCoverageItemTotalError';

it('not should be able to create a coverage item without total', () => {
  function execution() {
    new CoverageItem(undefined as unknown as number, 0, 0);
  }

  expect(execution).toThrowError(MissingCoverageItemTotalError);
});

it('not should be able to create a coverage item with invalid total', () => {
  function execution() {
    new CoverageItem('1' as unknown as number, 0, 0);
  }

  expect(execution).toThrowError(InvalidCoverageItemTotalError);
});

it('not should be able to create a coverage item with total less than 0', () => {
  function execution() {
    new CoverageItem(-1 as number, 0, 0);
  }

  expect(execution).toThrowError(InvalidCoverageItemTotalError);
});

it('should be able to create a coverage item with total equal 0', () => {
  const coverageItem = new CoverageItem(0, 0, 0);

  expect(coverageItem).toBeDefined();
});

it('not should be able to create a coverage item with sum of skipped + covered great than total', () => {
  function execution() {
    new CoverageItem(99, 50, 50);
  }

  expect(execution).toThrowError(InvalidCoverageItemTotalError);
});

it('not should be able to create a coverage item without covered', () => {
  function execution() {
    new CoverageItem(0, undefined as unknown as number, 0);
  }

  expect(execution).toThrowError(MissingCoverageItemCoveredError);
});

it('not should be able to create a coverage item with invalid covered', () => {
  function execution() {
    new CoverageItem(0, '1' as unknown as number, 0);
  }

  expect(execution).toThrowError(InvalidCoverageItemCoveredError);
});

it('not should be able to create a coverage item with covered less than 0', () => {
  function execution() {
    new CoverageItem(0, -1, 0);
  }

  expect(execution).toThrowError(InvalidCoverageItemCoveredError);
});

it('not should be able to create a coverage item with covered equal 0', () => {
  const coverageItem = new CoverageItem(0, 0, 0);

  expect(coverageItem).toBeDefined();
});

it('not should be able to create a coverage item with covered great than total', () => {
  function execution() {
    new CoverageItem(99, 100, 0);
  }

  expect(execution).toThrowError(InvalidCoverageItemCoveredError);
});

it('not should be able to create a coverage item without skipped', () => {
  function execution() {
    new CoverageItem(0, 0, undefined as unknown as number);
  }

  expect(execution).toThrowError(MissingCoverageItemSkippedError);
});

it('not should be able to create a coverage item with invalid skipped', () => {
  function execution() {
    new CoverageItem(0, 0, '1' as unknown as number);
  }

  expect(execution).toThrowError(InvalidCoverageItemSkippedError);
});

it('not should be able to create a coverage item with skipped less than 0', () => {
  function execution() {
    new CoverageItem(0, 0, -1);
  }

  expect(execution).toThrowError(InvalidCoverageItemSkippedError);
});

it('not should be able to create a coverage item with skipped equal 0', () => {
  const coverageItem = new CoverageItem(0, 0, 0);

  expect(coverageItem).toBeDefined();
});

it('not should be able to create a coverage item with skipped great than total', () => {
  function execution() {
    new CoverageItem(99, 0, 100);
  }

  expect(execution).toThrowError(InvalidCoverageItemSkippedError);
});

it('should be able to create a coverage item with percent equal to 100', () => {
  const coverageItem = new CoverageItem(100, 100, 0);

  expect(coverageItem).toBeDefined();
});

it('should be able to create a coverage item', () => {
  const coverageItem = new CoverageItem(100, 100, 0);

  expect(coverageItem).toBeDefined();
});
