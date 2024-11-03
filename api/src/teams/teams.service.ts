import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';

/**
 * The teams service.
 */
@Injectable()
export class TeamsService {
  /**
   * Constructor.
   * @param teamRepository Team DB repository.
   */
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
  ) { }

  /**
    * Creates a new team if the name does not already exist.
    * @param createTeamDto The team data transfer object.
    * @returns The newly created team.
    */
  async create(createTeamDto: CreateTeamDto): Promise<Team> {
    const { name } = createTeamDto;

    // Check if a team with the given name already exists.
    const existingTeam = await this.teamRepository.findOneBy({ name });
    if (existingTeam) {
      throw new ConflictException(`Team with name "${name}" already exists`);
    }

    // Create and save the new team.
    const team = this.teamRepository.create(createTeamDto);
    return this.teamRepository.save(team);
  }

  /**
   * Finds and returns all teams.
   * @returns An array of all teams.
   */
  async findAll(): Promise<Team[]> {
    return this.teamRepository.find();
  }

  /**
   * Finds a team by its id.
   * @param id The id of the team.
   * @returns The team with the specified id.
   */
  async findOne(id: string): Promise<Team> {
    const team = await this.teamRepository.findOneBy({ id });
    if (!team) {
      throw new NotFoundException(`Team with ID "${id}" not found`);
    }
    return team;
  }
}
