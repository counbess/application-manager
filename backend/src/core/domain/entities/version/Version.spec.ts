/* eslint-disable no-new */
import { Version } from './Version';
import { Coverage } from '../coverage/Coverage';
import { CoverageItem } from '../coverage-item/CoverageItem';
import { InvalidVersionNumberFormatError } from './errors/InvalidVersionNumberFormatError';
import { MissingVersionNumberError } from './errors/MissingVersionNumberError';
import { InvalidVersionNumberError } from './errors/InvalidVersionNumberError';
import { MissingVersionTotalCoverageError } from './errors/MissingVersionTotalCoverageError';
import { InvalidVersionTotalCoverageError } from './errors/InvalidVersionTotalCoverageError';
import { InvalidVersionFilesCoverageError } from './errors/InvalidVersionFilesCoverageError';
import { MissingVersionFilesCoverageError } from './errors/MissingVersionFilesCoverageError';

const totalCoverage = new Coverage(
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
  new CoverageItem(100, 100, 0),
);

it('not should be able to create a version without number', () => {
  function execution() {
    new Version(undefined as unknown as string, totalCoverage, new Map());
  }
  expect(execution).toThrowError(MissingVersionNumberError);
});

it('not should be able to create a version with invalid number', () => {
  function execution() {
    new Version(1 as unknown as string, totalCoverage, new Map());
  }
  expect(execution).toThrowError(InvalidVersionNumberError);
});

it('not should be able to create a version with invalid number format', () => {
  function execution() {
    new Version('a.b.c', totalCoverage, new Map());
  }
  expect(execution).toThrowError(InvalidVersionNumberFormatError);
});

it('not should be able to create a version without total coverage', () => {
  function execution() {
    new Version('1.0.0', undefined as unknown as Coverage, new Map());
  }
  expect(execution).toThrowError(MissingVersionTotalCoverageError);
});

it('not should be able to create a version with a invalid total coverage', () => {
  function execution() {
    new Version('1.0.0', 1 as unknown as Coverage, new Map());
  }
  expect(execution).toThrowError(InvalidVersionTotalCoverageError);
});

it('not should be able to create a version without files coverage', () => {
  function execution() {
    new Version('1.0.0', totalCoverage, undefined as unknown as Map<string, Coverage>);
  }
  expect(execution).toThrowError(MissingVersionFilesCoverageError);
});

it('not should be able to create a version with a invalid files coverage', () => {
  function execution() {
    new Version('1.0.0', totalCoverage, [] as unknown as Map<string, Coverage>);
  }
  expect(execution).toThrowError(InvalidVersionFilesCoverageError);
});

it('not should be able to create a version with a invalid files coverage', () => {
  function execution() {
    const filesCoverage = new Map<string, Coverage>();
    filesCoverage.set('index.js', totalCoverage);
    filesCoverage.set('server.js', 1 as unknown as Coverage);

    new Version('1.0.0', totalCoverage, filesCoverage);
  }
  expect(execution).toThrowError(InvalidVersionFilesCoverageError);
});

it('should be able to create a version', () => {
  const version = new Version('1.0.0', totalCoverage, new Map());

  expect(version).toBeDefined();
});
