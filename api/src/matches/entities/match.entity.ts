import { Matches } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Team } from "../../teams/entities/team.entity";

/**
 * Match entity.
 */
@Entity('match')
export class Match {
    /**
     * The unique id.
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * The score of the match.
     * @example '1-1'
     */
    @Column({ type: 'varchar', length: 10, nullable: true })
    @Matches(/^[0-9]+-[0-9]+$/, {
        message: "Score must be two sets of digits separated by a hyphen, e.g. '2-1'"
    })
    score?: string;

    /**
     * Date and time when the match is scheduled or took place.
     * @example '2024-11-10T15:00:00.000Z'
    */
    @Column({ type: 'datetime' })
    dateTime: Date;

    /**
     * The first team.
     */
    @ManyToOne(() => Team, { eager: true })
    @JoinColumn({ name: 'firstTeamId' })
    firstTeam: Team;

    /**
     * The second team.
     */
    @ManyToOne(() => Team, { eager: true })
    @JoinColumn({ name: 'secondTeamId' })
    secondTeam: Team;
}
