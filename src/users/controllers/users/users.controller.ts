import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from '../../dtos/CreateUser.dto';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import { CreateUserScoreDto } from 'src/users/dtos/CreateUserScore.dto';
import { AuthGuard } from '../../guards/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  //  Execute following in terminal window to check endpoint:
  //  curl -X GET http://localhost:3001/users
  @Get()
  async getUsers() {
    const users = await this.userService.fetchUsers();
    return users;
  }

  //  curl -X POST http://localhost:3001/users/
  //  -H "Content-Type: application/json"
  //  -d '{ "username": "Paul", "password": "123" }'
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    const user = this.userService.createUser(createUserDto);
    return user;
  }

  //  curl -X PUT http://localhost:3001/users/
  //  -H "Content-Type: application/json"
  //  -d '{ "username": "Pat", "password": "1234567" }'
  @Put(':id')
  async updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  //  Execute following in terminal window to check endpoint:
  //  curl -X DELETE http://localhost:3001/users/5
  @Delete(':id')
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }

  //  curl -X POST http://localhost:3001/users/1/scores
  //  -H "Content-Type: application/json"
  //  -d '{ "score": 10000, "playerName": "Paul" }'
  @Post(':id/scores')
  @UseGuards(AuthGuard)
  createUserScore(
    @Param('id', ParseIntPipe) id: number,
    @Body() createUserPostDto: CreateUserScoreDto,
  ) {
    return this.userService.createUserScore(id, createUserPostDto);
  }

  //  Execute following in terminal window to check endpoint:
  //  curl -X GET http://localhost:3001/users
  @Get('/leaderboard')
  async getLeaderboard(
    @Query('sortBy') sortBy: string,
    @Query('sortDir') sortDir: string,
  ) {
    console.log(sortBy, sortDir); // TODO - take into account sorting options
    const leaderboard = await this.userService.fetchLeaderboard();
    const sortedOutput = leaderboard.sort((a, b) => a.score - b.score);
    return sortedOutput.slice(0, 9);
  }
}
