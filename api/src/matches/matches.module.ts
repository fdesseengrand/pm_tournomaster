import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from '../teams/entities/team.entity';
import { Match } from './entities/match.entity';
import { MatchesController } from './matches.controller';
import { MatchesGateway } from './matches.gateway';
import { MatchesService } from './matches.service';

/**
 * The matches module.
 */
@Module({
    imports: [TypeOrmModule.forFeature([Match, Team])],
    controllers: [MatchesController],
    providers: [MatchesService, MatchesGateway],
})
export class MatchesModule {}
