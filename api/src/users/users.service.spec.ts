import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

const mockRepository = () => ({
  findOneBy: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let repository: jest.Mocked<Repository<User>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User)) as jest.Mocked<Repository<User>>;
  });

  describe('findOne', () => {
    it('should return a user if found by username', async () => {
      const username = 'some_username';
      const user = { id: '1', name: username, password: 'hashedpassword' } as User;

      repository.findOneBy.mockResolvedValue(user);

      const result = await service.findOne(username);

      expect(repository.findOneBy).toHaveBeenCalledWith({ name: username });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if user is not found', async () => {
      const username = 'non_existent_user';

      repository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne(username)).rejects.toThrow(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ name: username });
    });
  });
});
