import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from 'src/matches/entities/match.entity';
import { AuthModule } from './auth/auth.module';
import { MatchesModule } from './matches/matches.module';
import { Team } from './teams/entities/team.entity';
import { TeamsModule } from './teams/teams.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.sqlite',
      entities: [User, Match, Team],
      synchronize: true,
    }),
    TeamsModule,
    MatchesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
