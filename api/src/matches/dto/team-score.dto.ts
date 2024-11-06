import { IsNotEmpty, IsString } from 'class-validator';
import { CreateTeamDto } from '../../teams/dto/create-team.dto';

/**
 * Team's score validator.
 */
export class TeamScoreDto extends CreateTeamDto {
    /**
     * The id of the team.
     */
    @IsNotEmpty()
    @IsString()
    id: string;
}
