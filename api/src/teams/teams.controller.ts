import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamsService } from './teams.service';

/**
 * Tthe teams controller.
 */
@Controller('teams')
export class TeamsController {
  /**
   * Constructor.
   * @param teamsService The team service.
   */
  constructor(private readonly teamsService: TeamsService) { }

  /**
   * Creates a new team.
   * @param createTeamDto The team to create.
   */
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.create(createTeamDto);
  }

  /**
   * Gets all teams.
   */
  @Get()
  findAll() {
    return this.teamsService.findAll();
  }
}
