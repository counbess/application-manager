import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { UserNotOnTheTeamError } from './UserNotOnTheTeamError';

it('should be able to create a UserNotOnTheTeamError', () => {
  const error = new UserNotOnTheTeamError();

  expect(error.code).toBe(ApplicationErrorCodes.USER_NOT_ON_THE_TEAM);
  expect(error.message).toBe('User is not on the team');
});
