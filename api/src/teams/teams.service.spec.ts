import { ConflictException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';
import { TeamsService } from './teams.service';

const mockRepository = () => ({
  find: jest.fn(),
  findOneBy: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('TeamsService', () => {
  let service: TeamsService;
  let repository: jest.Mocked<Repository<Team>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getRepositoryToken(Team),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    repository = module.get<Repository<Team>>(getRepositoryToken(Team)) as jest.Mocked<Repository<Team>>;
  });

  describe('create', () => {
    it('should create a team if the name is unique', async () => {
      const createTeamDto: CreateTeamDto = { name: 'Unique Team' };

      repository.findOneBy.mockResolvedValue(null);
      repository.create.mockReturnValue(createTeamDto as Team);
      repository.save.mockResolvedValue(createTeamDto as Team);

      const result = await service.create(createTeamDto);

      expect(repository.findOneBy).toHaveBeenCalledWith({ name: 'Unique Team' });
      expect(repository.create).toHaveBeenCalledWith(createTeamDto);
      expect(repository.save).toHaveBeenCalledWith(createTeamDto);
      expect(result).toEqual(createTeamDto);
    });

    it('should throw a ConflictException if the team name already exists', async () => {
      const createTeamDto: CreateTeamDto = { name: 'Existing Team' };

      repository.findOneBy.mockResolvedValue({ id: '1', ...createTeamDto } as Team);

      await expect(service.create(createTeamDto)).rejects.toThrow(ConflictException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ name: 'Existing Team' });
    });
  });

  describe('findAll', () => {
    it('should return an array of teams', async () => {
      const teams = [{ id: '1', name: 'Team A' }, { id: '2', name: 'Team B' }] as Team[];
      repository.find.mockResolvedValue(teams);

      const result = await service.findAll();

      expect(repository.find).toHaveBeenCalled();
      expect(result).toEqual(teams);
    });
  });

  describe('findOne', () => {
    it('should return a team if it exists', async () => {
      const team = { id: '1', name: 'Team A' } as Team;
      repository.findOneBy.mockResolvedValue(team);

      const result = await service.findOne('1');

      expect(repository.findOneBy).toHaveBeenCalledWith({ id: '1' });
      expect(result).toEqual(team);
    });

    it('should throw a NotFoundException if the team does not exist', async () => {
      repository.findOneBy.mockResolvedValue(null);

      await expect(service.findOne('nonexistent-id')).rejects.toThrow(NotFoundException);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: 'nonexistent-id' });
    });
  });
});
