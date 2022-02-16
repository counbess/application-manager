export enum UserRole {
  /**
   * Administrators can manage targets
   * Have all leader and developer permissions
   */
  ADMINISTRATOR = 'ADMINISTRATOR',

  /**
   * Leaders can create applications and manage users
   * Have all developer permissions
   */
  LEADER = 'LEADER',

  /**
   * Developer can access applications and code them
   */
  DEVELOPER = 'DEVELOPER',
}
