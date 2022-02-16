import { ApplicationErrorCodes } from '~/core/common/interfaces/error';
import { UserAlreadyOnTheTeamError } from './UserAlreadyOnTheTeamError';

it('should be able to create a UserAlreadyOnTheTeamError', () => {
  const error = new UserAlreadyOnTheTeamError();

  expect(error.code).toBe(ApplicationErrorCodes.USER_ALREADY_ON_THE_TEAM);
  expect(error.message).toBe('User is already on the team');
});
