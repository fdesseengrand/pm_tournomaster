import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesGateway } from './matches.gateway';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
    /**
     * Constructor.
     * @param matchesService The matches service.
     * @param matchesGateway
     */
    constructor(
        private readonly matchesService: MatchesService,
        private readonly matchesGateway: MatchesGateway,
    ) {}

    /**
     * Finds all the matches.
     * @returns The matches.
     */
    @Get()
    findAll() {
        return this.matchesService.findAll();
    }

    /**
     * Creates a past or future match.
     * @param createMatchDto The match creation validator.
     * @returns The created match.
     */
    @Post()
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    create(@Body() createMatchDto: CreateMatchDto) {
        const match = this.matchesService.create(createMatchDto);
        this.matchesGateway.emitMatchUpdate();
        return match;
    }

    /**
     * Updates a match.
     * @param updateMatchDto The match update validator.
     */
    @Patch(':id')
    // @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
        const match = this.matchesService.update(id, updateMatchDto);
        this.matchesGateway.emitMatchUpdate();
        return match;
    }
}
