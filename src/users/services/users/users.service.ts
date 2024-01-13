import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/User';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserParams,
  UpdateUserParams,
  CreateUserScoreParams,
} from 'src/utils/types';
import { Score } from 'src/typeorm/entities/Score';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}

  fetchUsers() {
    return this.userRepository.find({ relations: [] });
  }

  fetchLeaderboard() {
    return this.scoreRepository.find({ relations: [] });
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });
    return this.userRepository.save(newUser);
  }

  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails });
  }

  deleteUser(id: number) {
    return this.userRepository.delete({ id });
  }

  async createUserScore(
    id: number,
    createUserScoreDetails: CreateUserScoreParams,
  ) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user)
      throw new HttpException(
        'User not found. Cannot create Score',
        HttpStatus.BAD_REQUEST,
      );
    const newScore = this.scoreRepository.create({
      ...createUserScoreDetails,
      user,
    });
    return this.scoreRepository.save(newScore);
  }
}
