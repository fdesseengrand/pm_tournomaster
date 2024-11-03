import { IsString } from "class-validator";

/**
 * Sign in request validator.
 */
export class SignInDto {
    /**
     * The name.
     */
    @IsString()
    name: string;

    /**
     * The password.
     */
    @IsString()
    password: string;
}