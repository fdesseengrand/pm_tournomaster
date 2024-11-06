import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Team } from '../teams/entities/team.entity';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';

/**
 * The matches service.
 */
@Injectable()
export class MatchesService {
    /**
     * Constructor.
     * @param matchRepository The match DB repository.
     * @param teamRepository  The team DB repository.
     */
    constructor(
        @InjectRepository(Match)
        private readonly matchRepository: Repository<Match>,
        @InjectRepository(Team)
        private readonly teamRepository: Repository<Team>,
    ) {}

    /**
     * Creates a new match with the given data.
     * @param createMatchDto - Data to create the match
     */
    async create(createMatchDto: CreateMatchDto): Promise<Match> {
        const { firstTeam, secondTeam, dateTime } = createMatchDto;

        // Fetch team entities.
        const firstTeamEntity = await this.teamRepository.findOneBy({
            id: firstTeam.id,
        });
        const secondTeamEntity = await this.teamRepository.findOneBy({
            id: secondTeam.id,
        });

        if (!firstTeamEntity || !secondTeamEntity) {
            throw new NotFoundException('One or both teams not found');
        }

        // Create new match entity.
        const match = this.matchRepository.create({
            firstTeam: firstTeamEntity,
            secondTeam: secondTeamEntity,
            dateTime,
            score: createMatchDto.score,
        });

        return this.matchRepository.save(match);
    }

    /**
     * Returns all matches.
     */
    async findAll(): Promise<Match[]> {
        return (await this.matchRepository.find()).sort(
            (a, b) => a.dateTime.getTime() - b.dateTime.getTime(),
        );
    }

    /**
     * Finds a match by its ID.
     * @param id - ID of the match
     */
    async findOne(id: string): Promise<Match> {
        const match = await this.matchRepository.findOneBy({ id });
        if (!match) {
            throw new NotFoundException(`Match with ID ${id} not found`);
        }
        return match;
    }

    /**
     * Updates a match's information.
     * @param id - ID of the match to update
     * @param updateMatchDto - New data for the match
     */
    async update(id: string, updateMatchDto: UpdateMatchDto): Promise<Match> {
        const { firstTeam, secondTeam } = updateMatchDto;

        // Fetch the existing match
        const match = await this.findOne(id);

        // Update match fields if provided
        if (firstTeam && secondTeam) {
            const firstTeamEntity = await this.teamRepository.findOneBy({
                id: firstTeam.id,
            });
            const secondTeamEntity = await this.teamRepository.findOneBy({
                id: secondTeam.id,
            });

            if (!firstTeamEntity || !secondTeamEntity) {
                throw new NotFoundException('One or both teams not found');
            }

            match.firstTeam = firstTeamEntity;
            match.secondTeam = secondTeamEntity;
            match.score = updateMatchDto.score;
        }

        if (updateMatchDto.dateTime) {
            match.dateTime = updateMatchDto.dateTime;
        }

        return this.matchRepository.save(match);
    }
}
