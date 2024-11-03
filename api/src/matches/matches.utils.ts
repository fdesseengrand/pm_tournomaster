import { TeamScoreDto } from "./dto/team-score.dto";

/**
 * Builds a score from two teams.
 * @param firstTeam 
 * @param secondTeam 
 * @returns 
 */
export const buildScore = (firstTeam: TeamScoreDto, secondTeam: TeamScoreDto): string => {
    return `${firstTeam.score}-${secondTeam.score}`;
}
