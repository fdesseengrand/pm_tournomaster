import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

/**
 * Authentication service.
 */
@Injectable()
export class AuthService {
    readonly ACCESS_TOKEN_LIFETIME = "30m";

    /**
     * Constructor.
     * @param jwtService The JWT Service.
     * @param usersService The users service.
     */
    constructor(private jwtService: JwtService, private usersService: UsersService) { }

    /**
     * Authenticates the user.
     * @param username The user's name.
     * @param pwd The user's password.
    */
    async signIn(
        username: string,
        pwd: string,
    ): Promise<{ access_token: string, refresh_token: string }> {
        const user = await this.usersService.findOne(username);
        if (user?.password !== pwd) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.name };
        return {
            access_token: this.jwtService.sign(payload, { expiresIn: this.ACCESS_TOKEN_LIFETIME }),
            refresh_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
        };
    }

    /**
     * Refresh the access token.
     * @param refreshToken The refresh token.
     */
    async refreshAccessToken(refreshToken: string) {
        try {
            const payload = await this.jwtService.verifyAsync(refreshToken);
            return {
                access_token: this.jwtService.sign({ username: payload.username, sub: payload.sub }, { expiresIn: this.ACCESS_TOKEN_LIFETIME })
            };
        } catch (_) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}
