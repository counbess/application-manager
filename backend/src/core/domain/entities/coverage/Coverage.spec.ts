/* eslint-disable no-new */
import { CoverageItem } from '../coverage-item/CoverageItem';
import { Coverage } from './Coverage';
import { MissingCoverageBranchError } from './errors/MissingCoverageBranchError';
import { MissingCoverageFunctionError } from './errors/MissingCoverageFunctionError';
import { MissingCoverageLineError } from './errors/MissingCoverageLineError';
import { MissingCoverageStatementError } from './errors/MissingCoverageStatementError';

it('should be able to create a Coverage', () => {
  const lineCoverage = new CoverageItem(100, 100, 0);
  const statementCoverage = new CoverageItem(100, 100, 0);
  const functionCoverage = new CoverageItem(100, 100, 0);
  const branchCoverage = new CoverageItem(100, 100, 0);

  const coverage = new Coverage(
    lineCoverage,
    statementCoverage,
    functionCoverage,
    branchCoverage,
  );

  expect(coverage).toBeDefined();
});

it('not should be able to create a coverage without line', () => {
  function execution() {
    const statementCoverage = new CoverageItem(100, 100, 0);
    const functionCoverage = new CoverageItem(100, 100, 0);
    const branchCoverage = new CoverageItem(100, 100, 0);

    new Coverage(
      undefined as unknown as CoverageItem,
      statementCoverage,
      functionCoverage,
      branchCoverage,
    );
  }

  expect(execution).toThrowError(MissingCoverageLineError);
});

it('not should be able to create a coverage without statement', () => {
  function execution() {
    const linesCoverage = new CoverageItem(100, 100, 0);
    const functionCoverage = new CoverageItem(100, 100, 0);
    const branchCoverage = new CoverageItem(100, 100, 0);

    new Coverage(
      linesCoverage,
      undefined as unknown as CoverageItem,
      functionCoverage,
      branchCoverage,
    );
  }

  expect(execution).toThrowError(MissingCoverageStatementError);
});

it('not should be able to create a coverage without function', () => {
  function execution() {
    const lineCoverage = new CoverageItem(100, 100, 0);
    const statementCoverage = new CoverageItem(100, 100, 0);
    const branchCoverage = new CoverageItem(100, 100, 0);

    new Coverage(
      lineCoverage,
      statementCoverage,
      undefined as unknown as CoverageItem,
      branchCoverage,
    );
  }

  expect(execution).toThrowError(MissingCoverageFunctionError);
});

it('not should be able to create a coverage without branch', () => {
  function execution() {
    const lineCoverage = new CoverageItem(100, 100, 0);
    const statementCoverage = new CoverageItem(100, 100, 0);
    const functionCoverage = new CoverageItem(100, 100, 0);

    new Coverage(
      lineCoverage,
      statementCoverage,
      functionCoverage,
      undefined as unknown as CoverageItem,
    );
  }

  expect(execution).toThrowError(MissingCoverageBranchError);
});
