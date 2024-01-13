import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { User } from 'src/typeorm/entities/User';
import { Score } from 'src/typeorm/entities/Score';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([User, Score])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'users/:id/scores',
      method: RequestMethod.POST,
    });
  }
}
