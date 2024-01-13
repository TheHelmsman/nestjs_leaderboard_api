import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { Score } from './typeorm/entities/Score';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'lets_go_fishing',
      database: 'nestjs_sql',
      entities: [User, Score],
      synchronize: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
