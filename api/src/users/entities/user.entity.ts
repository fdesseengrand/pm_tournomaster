import { Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

/**
 * User entity.
 */
@Entity('user')
export class User {
    /**
     * The unique id.
     */
    @PrimaryGeneratedColumn("uuid")
    id: string;

    /**
     * The name of the user.
     */
    @Column({ type: 'varchar', length: 100, unique: true })
    @Length(3, 100)
    name: string;

    /**
     * Hashed password for the user.
     */
    @Column({ type: 'varchar', length: 30 })
    password: string;
}
