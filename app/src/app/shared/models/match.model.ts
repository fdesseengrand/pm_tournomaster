import { Team, TeamScoreDto } from "./team.model";

/**
 * Match entity.
 */
export interface Match {
  /**
   * The unique id.
   */
  id: string;

  /**
   * The score of the match.
   * @example '1-1'
   */
  score?: string;

  /**
   * Date and time when the match is scheduled or took place.
   * @example '2024-11-10T15:00:00.000Z'
   */
  dateTime: string;

  /**
   * The first team.
   */
  firstTeam: Team;

  /**
   * The second team.
   */
  secondTeam: Team;
}

/**
 * Match creation validator.
 */
export interface CreateMatchDto {
  /**
   * Information for the first team, including id and score.
   */
  firstTeam: TeamScoreDto;

  /**
   * Information for the second team, including id and score.
   */
  secondTeam: TeamScoreDto;

  /**
   * Date and time when the match is scheduled or took place.
   * @example '2024-11-10T15:00:00.000Z'
   */
  dateTime: string;
}

/**
 * Match update validator.
 */
export interface UpdateMatchDto extends CreateMatchDto {
  /**
   * The unique id.
   */
  id: string;
}
