import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';
import { TeamScoreDto } from './team-score.dto';

/**
 * Match creation validator.
 */
export class CreateMatchDto {
    /**
     * Information for the first team, including id and score.
     */
    @IsNotEmpty()
    @Type(() => TeamScoreDto)
    firstTeam: TeamScoreDto;

    /**
     * Information for the second team, including id and score.
     */
    @IsNotEmpty()
    @Type(() => TeamScoreDto)
    secondTeam: TeamScoreDto;

    /**
     * Date and time when the match is scheduled or took place.
     */
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    dateTime: Date;
}
