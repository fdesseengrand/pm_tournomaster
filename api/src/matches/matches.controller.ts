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
import { JwtAuthGuard } from '../auth/jwt.auth.guard';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
    /**
     * Constructor.
     * @param matchesService The matches service.
     */
    constructor(private readonly matchesService: MatchesService) {}

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
        return this.matchesService.create(createMatchDto);
    }

    /**
     * Updates a match.
     * @param updateMatchDto The match update validator.
     */
    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
        return this.matchesService.update(id, updateMatchDto);
    }
}
