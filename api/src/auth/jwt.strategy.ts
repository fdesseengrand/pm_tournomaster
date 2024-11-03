import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_SECRET } from './auth.constants';

/**
 * Strategy for JWT token validaiton.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    /**
     * Constructor.
     */
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: JWT_SECRET,
        });
    }

    /**
     * Validates JWT tokens for protected routes.
     * @param payload The request payload.
     */
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username };
    }
}