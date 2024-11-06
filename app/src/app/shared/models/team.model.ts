/**
 * Team entity.
 */
export interface Team {
  /**
   * The unique id.
   */
  id: string;

  /**
   * The name of the team.
   */
  name: string;
}

/**
 * The team creation request validator.
 */
export interface CreateTeamDto {
  /**
   * The name of the team.
   */
  name: string;
}
