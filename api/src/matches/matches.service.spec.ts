// src/match/matches.service.spec.ts
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { MatchesService } from './matches.service';

describe('MatchesService', () => {
  let service: MatchesService;
  let matchRepository: Repository<Match>;
  let teamRepository: Repository<Team>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MatchesService,
        {
          provide: getRepositoryToken(Match),
          useValue: {
            find: jest.fn(),
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Team),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<MatchesService>(MatchesService);
    matchRepository = module.get<Repository<Match>>(getRepositoryToken(Match));
    teamRepository = module.get<Repository<Team>>(getRepositoryToken(Team));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a new match', async () => {
      const createMatchDto: CreateMatchDto = {
        firstTeam: { id: 'team1', score: 2 },
        secondTeam: { id: 'team2', score: 3 },
        dateTime: new Date(),
      };

      const firstTeam = { id: 'team1', name: 'Team 1' } as Team;
      const secondTeam = { id: 'team2', name: 'Team 2' } as Team;
      const match = { ...createMatchDto, id: 'match1' } as unknown as Match;

      jest.spyOn(teamRepository, 'findOneBy')
        .mockResolvedValueOnce(firstTeam)
        .mockResolvedValueOnce(secondTeam);
      jest.spyOn(matchRepository, 'create');
      jest.spyOn(matchRepository, 'save').mockResolvedValueOnce(match);

      const result = await service.create(createMatchDto);

      expect(result).toEqual(expect.objectContaining({ id: 'match1' }));
      expect(matchRepository.save).toHaveBeenCalled();
    });

    it('should throw NotFoundException if one or both teams are not found', async () => {
      const createMatchDto = {
        firstTeam: { id: 'team1', score: 2 },
        secondTeam: { id: 'team2', score: 3 },
        dateTime: new Date(),
      };

      jest.spyOn(teamRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.create(createMatchDto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of matches', async () => {
      const matches = [{ id: 'match1' }, { id: 'match2' }] as Match[];
      jest.spyOn(matchRepository, 'find').mockResolvedValueOnce(matches);

      const result = await service.findAll();

      expect(result).toEqual(matches);
      expect(matchRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a match if it exists', async () => {
      const match = { id: 'match1' } as Match;
      jest.spyOn(matchRepository, 'findOneBy').mockResolvedValueOnce(match);

      const result = await service.findOne('match1');

      expect(result).toEqual(match);
    });

    it('should throw NotFoundException if the match is not found', async () => {
      jest.spyOn(matchRepository, 'findOneBy').mockResolvedValueOnce(null);

      await expect(service.findOne('nonexistent')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update an existing match', async () => {
      const match = { id: 'match1', firstTeam: { id: 'team1' } as Team, secondTeam: { id: 'team2' } as Team } as Match;
      const updateMatchDto: UpdateMatchDto = {
        firstTeam: { id: 'team1', score: 2 },
        secondTeam: { id: 'team2', score: 3 },
        dateTime: new Date(),
        id: 'match1'
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(match);
      jest.spyOn(teamRepository, 'findOneBy')
        .mockResolvedValueOnce(match.firstTeam)
        .mockResolvedValueOnce(match.secondTeam);
      jest.spyOn(matchRepository, 'create');
      jest.spyOn(matchRepository, 'save').mockResolvedValueOnce({ ...match, score: '2-3' });

      const result = await service.update('match1', updateMatchDto);

      expect(result.score).toBe('2-3');
      expect(matchRepository.save).toHaveBeenCalledWith(expect.objectContaining({ score: '2-3' }));
    });

    it('should throw NotFoundException if one or both teams are not found', async () => {
      const match = { id: 'match1' } as Match;
      const updateMatchDto = {
        firstTeam: { id: 'team1', score: 2 },
        secondTeam: { id: 'team2', score: 3 },
        dateTime: new Date(),
        id: 'match1'
      };

      jest.spyOn(service, 'findOne').mockResolvedValueOnce(match);
      jest.spyOn(teamRepository, 'findOneBy').mockResolvedValue(null);

      await expect(service.update('match1', updateMatchDto)).rejects.toThrow(NotFoundException);
    });
  });
});
