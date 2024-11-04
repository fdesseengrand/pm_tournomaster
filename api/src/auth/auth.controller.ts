import { Body, Controller, HttpCode, HttpStatus, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

/**
 * Authentication controller.
 */
@Controller('auth')
export class AuthController {
    /**
     * Constructor.
     * @param authService The authentication service.
     */
    constructor(private authService: AuthService) { }

    /**
     * Log the user in.
     * @param signInDto 
     */
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.name, signInDto.password);
    }

    /**
     * Refresh the authentication token.
     * @param refreshToken The refresh token.
     */
    @Post('refresh')
    async refresh(@Body('refresh_token') refreshToken: string) {
        if (!refreshToken) {
            throw new UnauthorizedException('Refresh token is required');
        }
        return this.authService.refreshAccessToken(refreshToken);
    }
}
