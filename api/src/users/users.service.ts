import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/**
 * The users service.
 */
@Injectable()
export class UsersService {
  /**
   * Constructor.
   * @param userRepository User DB repository.
   */
  constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

  /**
   * Finds a user by its name.
   * @param username The user's name.
   */
  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({
      name: username
    });

    if (!user) {
      throw new NotFoundException(`USer with name "${username}" not found`);
    }
    return user;
  }
}
