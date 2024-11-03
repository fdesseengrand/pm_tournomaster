// auth.service.spec.ts
import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
            verifyAsync: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('signIn', () => {
    it('should return access and refresh tokens for valid credentials', async () => {
      const user = { id: 'user1', name: 'Some User', password: 'password123' };
      const payload = { sub: user.id, username: user.name };

      jest.spyOn(usersService, 'findOne').mockResolvedValue(user);
      jest.spyOn(jwtService, 'sign').mockImplementation((payload, options) =>
        options.expiresIn === authService.ACCESS_TOKEN_LIFETIME ? 'access_token' : 'refresh_token',
      );

      const result = await authService.signIn(user.name, user.password);

      expect(result).toEqual({
        access_token: 'access_token',
        refresh_token: 'refresh_token',
      });
      expect(usersService.findOne).toHaveBeenCalledWith(user.name);
      expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: authService.ACCESS_TOKEN_LIFETIME });
      expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: '7d' });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue({ id: 'user1', name: 'Some User', password: 'password123' });

      await expect(authService.signIn('Some User', 'wrongpassword')).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if user does not exist', async () => {
      jest.spyOn(usersService, 'findOne').mockResolvedValue(null);

      await expect(authService.signIn('NonExistentUser', 'password')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('refreshAccessToken', () => {
    it('should return a new access token for a valid refresh token', async () => {
      const payload = { sub: 'user1', username: 'Some User' };
      jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(payload);
      jest.spyOn(jwtService, 'sign').mockReturnValue('new_access_token');

      const result = await authService.refreshAccessToken('valid_refresh_token');

      expect(result).toEqual({ access_token: 'new_access_token' });
      expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid_refresh_token');
      expect(jwtService.sign).toHaveBeenCalledWith(payload, { expiresIn: authService.ACCESS_TOKEN_LIFETIME });
    });

    it('should throw UnauthorizedException for an invalid refresh token', async () => {
      jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error('Invalid token'));

      await expect(authService.refreshAccessToken('invalid_refresh_token')).rejects.toThrow(UnauthorizedException);
    });
  });
});
