import { InvalidApplicationNameError } from './errors/InvalidApplicationNameError';
import { MissingApplicationNameError } from './errors/MissingApplicationNameError';
import { MissingApplicationOwnerError } from './errors/MissingApplicationOwnerError';
import { InvalidApplicationOwnerError } from './errors/InvalidApplicationOwnerError';
import { User } from '../user/User';
import { Team } from '../team/Team';
import { Version } from '../version/Version';
import { Scope } from '../scope/Scope';
import { Target } from '../target/Target';
import { AuthenticationPlan } from '../authentication-plan/AuthenticationPlan';
import { MissingApplicationRepositoryURLError } from './errors/MissingApplicationRepositoryURLError';
import { InvalidApplicationRepositoryURLError } from './errors/InvalidApplicationRepositoryURLError';

export class Application {
  private readonly team: Team = new Team();

  private readonly versions: Version[] = [];

  private readonly scopes: Scope[] = [];

  private readonly targets: Target[] = [];

  private readonly plans: AuthenticationPlan[] = [];

  constructor(
    readonly name: string,
    readonly owner: User,
    readonly repositoryURL: string,
  ) {
    if (!name) {
      throw new MissingApplicationNameError();
    } else if (typeof name !== 'string') {
      throw new InvalidApplicationNameError();
    }

    if (!owner) {
      throw new MissingApplicationOwnerError();
    } else if (!(owner instanceof User)) {
      throw new InvalidApplicationOwnerError();
    }

    if (!repositoryURL) {
      throw new MissingApplicationRepositoryURLError();
    } else if (typeof repositoryURL !== 'string') {
      throw new InvalidApplicationRepositoryURLError();
    }
  }
}
