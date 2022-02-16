export enum ApplicationErrorCodes {
  // Use Case
  USER_ID_NOT_FOUND = 'UseCase.UserIdNotFound',
  USERNAME_ALREADY_EXISTS = 'UseCase.UsernameAlreadyExists',
  MISSING_USERS_REPOSITORY = 'UsersUseCase.MissingRepository',
  INVALID_USERS_REPOSITORY = 'UsersUseCase.InvalidRepository',

  // Application
  MISSING_APPLICATION_NAME = 'Application.MissingName',
  INVALID_APPLICATION_NAME = 'Application.InvalidName',
  MISSING_APPLICATION_OWNER = 'Application.MissingOwner',
  INVALID_APPLICATION_OWNER = 'Application.InvalidOwner',

  // Scope
  MISSING_SCOPE_NAME = 'Scope.MissingName',
  INVALID_SCOPE_NAME = 'Scope.InvalidName',
  MISSING_SCOPE_TARGET = 'Scope.MissingTarget',
  INVALID_SCOPE_TARGET = 'Scope.InvalidTarget',
  SCOPE_DUPLICATE_ENV_VARIABLE = 'Scope.DuplicateEnvironmentKey',
  SCOPE_MISSING_ENV_VARIABLE = 'Scope.MissingEnvironmentKey',
  SCOPE_INVALID_ENV_VARIABLE_FORMAT = 'Scope.InvalidEnvironmentKeyFormat',
  VERSION_CURRENTLY_APPLIED_IN_SCOPE = 'Scope.VersionCurrentlyApplied',

  // Target
  MISSING_TARGET_NAME = 'Target.MissingName',
  INVALID_TARGET_NAME = 'Target.InvalidName',
  MISSING_TARGET_TYPE = 'Target.MissingType',
  INVALID_TARGET_TYPE = 'Target.InvalidType',
  MISSING_TARGET_HOST = 'Target.MissingHost',
  INVALID_TARGET_HOST = 'Target.InvalidHost',
  MISSING_TARGET_PORT = 'Target.MissingPort',
  INVALID_TARGET_PORT = 'Target.InvalidPort',

  // Version
  MISSING_VERSION_NUMBER = 'Version.MissingNumber',
  INVALID_VERSION_NUMBER = 'Version.InvalidNumber',
  INVALID_VERSION_NUMBER_FORMAT = 'Version.InvalidNumberFormat',
  MISSING_VERSION_TOTAL_COVERAGE = 'Version.MissingTotalCoverage',
  INVALID_VERSION_TOTAL_COVERAGE = 'Version.InvalidTotalCoverage',
  MISSING_VERSION_FILES_COVERAGE = 'Version.MissingFilesCoverage',
  INVALID_VERSION_FILES_COVERAGE = 'Version.InvalidFilesCoverage',

  // PublishedVersion
  MISSING_PUBLISHED_VERSION_PUBLISHER = 'PublishedVersion.MissingPublisher',
  INVALID_PUBLISHED_VERSION_PUBLISHER = 'PublishedVersion.InvalidPublisher',

  // CoverageItem
  MISSING_COVERAGE_ITEM_TOTAL = 'CoverageItem.MissingTotal',
  INVALID_COVERAGE_ITEM_TOTAL = 'CoverageItem.InvalidTotal',
  MISSING_COVERAGE_ITEM_COVERED = 'CoverageItem.MissingCovered',
  INVALID_COVERAGE_ITEM_COVERED = 'CoverageItem.InvalidCovered',
  MISSING_COVERAGE_ITEM_SKIPPED = 'CoverageItem.MissingSkipped',
  INVALID_COVERAGE_ITEM_SKIPPED = 'CoverageItem.InvalidSkipped',

  // Coverage
  MISSING_COVERAGE_LINE = 'Coverage.MissingLine',
  MISSING_COVERAGE_STATEMENT = 'Coverage.MissingStatement',
  MISSING_COVERAGE_FUNCTION = 'Coverage.MissingFunction',
  MISSING_COVERAGE_BRANCH = 'Coverage.MissingBranch',

  // User
  MISSING_USER_USERNAME = 'User.MissingUsername',
  INVALID_USER_USERNAME = 'User.InvalidUsername',
  MISSING_USER_ROLE = 'User.MissingRole',
  INVALID_USER_ROLE = 'User.InvalidRole',

  // Consumer
  MISSING_CONSUMER_NAME = 'Consumer.MissingName',
  INVALID_CONSUMER_NAME = 'Consumer.InvalidName',
  MISSING_CONSUMER_DESCRIPTION = 'Consumer.MissingDescription',
  INVALID_CONSUMER_DESCRIPTION = 'Consumer.InvalidDescription',

  // Team
  USER_NOT_ON_THE_TEAM = 'Team.UserNotOnTeam',
  USER_ALREADY_ON_THE_TEAM = 'Team.UserAlreadyOnTeam',
  PERMISSION_ALREADY_ADDED_TO_USER = 'Team.PermissionAlreadyAddedToUser',
  MISSING_PERMISSION_IN_USER = 'Team.MissingPermissionInUser',

  // Authentication Plan
  MISSING_AUTHENTICATION_PLAN_CONSUMER = 'AuthenticationPlan.MissingConsumer',
  INVALID_AUTHENTICATION_PLAN_CONSUMER = 'AuthenticationPlan.InvalidConsumer',
  MISSING_AUTHENTICATION_PLAN_KEY = 'AuthenticationPlan.MissingKey',
  INVALID_AUTHENTICATION_PLAN_KEY = 'AuthenticationPlan.InvalidKey',
  INVALID_AUTHENTICATION_PLAN_KEY_FORMAT = 'AuthenticationPlan.InvalidKeyFormat',
}

export class ApplicationManagerError extends Error {
  constructor(message: string, public code: ApplicationErrorCodes) {
    super(message);
  }
}
