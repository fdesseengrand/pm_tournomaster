import { IsNotEmpty, IsString } from 'class-validator';
import { CreateMatchDto } from './create-match.dto';

/**
 * Match update validator.
 */
export class UpdateMatchDto extends CreateMatchDto {
    /**
     * The unique id.
     */
    @IsString()
    @IsNotEmpty()
    id: string;
}
