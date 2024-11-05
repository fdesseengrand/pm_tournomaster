import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Team's score validator.
 */
export class TeamScoreDto {
    /**
     * The id of the team.
     */
    @IsNotEmpty()
    @IsString()
    id: string;

    /**
     * The score achieved by the team.
     */
    @IsNumber()
    score: number;
}
