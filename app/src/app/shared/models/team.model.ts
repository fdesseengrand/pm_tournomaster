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

/**
 * Team's score validator.
 */
export interface TeamScoreDto {
  /**
   * The id of the team.
   */
  id: string;

  /**
   * The score achieved by the team.
   */
  score: number;
}
