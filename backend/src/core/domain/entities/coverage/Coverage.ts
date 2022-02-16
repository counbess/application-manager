import { CoverageItem } from '../coverage-item/CoverageItem';
import { MissingCoverageBranchError } from './errors/MissingCoverageBranchError';
import { MissingCoverageFunctionError } from './errors/MissingCoverageFunctionError';
import { MissingCoverageLineError } from './errors/MissingCoverageLineError';
import { MissingCoverageStatementError } from './errors/MissingCoverageStatementError';

export class Coverage {
  constructor(
    readonly lines: CoverageItem,
    readonly statements: CoverageItem,
    readonly functions: CoverageItem,
    readonly branches: CoverageItem,
  ) {
    if (!lines) {
      throw new MissingCoverageLineError();
    }

    if (!statements) {
      throw new MissingCoverageStatementError();
    }

    if (!functions) {
      throw new MissingCoverageFunctionError();
    }

    if (!branches) {
      throw new MissingCoverageBranchError();
    }
  }
}
