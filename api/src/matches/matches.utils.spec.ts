import { TeamScoreDto } from './dto/team-score.dto';
import { buildScore } from './matches.utils';

describe('buildScore', () => {
    it('should return the correct score string for given team scores', () => {
        const firstTeam: TeamScoreDto = { id: 'A', score: 3 };
        const secondTeam: TeamScoreDto = { id: 'B', score: 2 };
        const result = buildScore(firstTeam, secondTeam);
        expect(result).toBe('3-2');
    });

    it('should return the correct score string when one of the teams has a score of 0', () => {
        const firstTeam: TeamScoreDto = { id: 'A', score: 0 };
        const secondTeam: TeamScoreDto = { id: 'B', score: 4 };
        const result = buildScore(firstTeam, secondTeam);
        expect(result).toBe('0-4');
    });
});
