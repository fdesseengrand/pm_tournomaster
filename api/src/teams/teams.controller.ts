import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
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
    constructor(private readonly teamsService: TeamsService) {}

    /**
     * Creates a new team.
     * @param createTeamDto The team to create.
     * @returns The created team.
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    create(@Body() createTeamDto: CreateTeamDto) {
        return this.teamsService.create(createTeamDto);
    }

    /**
     * Gets all teams.
     * @returns The teams.
     */
    @Get()
    findAll() {
        return this.teamsService.findAll();
    }
}
