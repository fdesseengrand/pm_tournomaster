import { IsString, Length } from "class-validator";

/**
 * The team creation request validator.
 */
export class CreateTeamDto {
    /**
     * The name of the team.
     */
    @IsString()
    @Length(3, 60)
    name: string;
}
