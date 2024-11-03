import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { MatchesService } from './matches.service';

@Controller('matches')
export class MatchesController {
  constructor(private readonly matchesService: MatchesService) { }

  /**
   * Creates a past or future match.
   * @param createMatchDto 
   * @returns The created match.
   */
  @Post()
  create(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.create(createMatchDto);
  }

  /**
   * Finds all the matches.
   * @returns The matches.
   */
  @Get()
  findAll() {
    return this.matchesService.findAll();
  }
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchesService.update(id, updateMatchDto);
  }
}
