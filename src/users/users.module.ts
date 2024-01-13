import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { Score } from 'src/typeorm/entities/Score';

@Module({
  imports: [TypeOrmModule.forFeature([User, Score])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
