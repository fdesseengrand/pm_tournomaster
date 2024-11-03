import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * Team entity.
 */
@Entity('team')
export class Team {
    /**
     * The unique id.
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * The name of the team.
     */
    @Column({ type: 'varchar', unique: true })
    @Length(3, 60)
    name: string;
}
