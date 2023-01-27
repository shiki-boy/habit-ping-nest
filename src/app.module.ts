import { Habit } from './goal/habit.entity';
import { Goal } from './goal/goal.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './db/dataSource';
import { User } from './user/user.entity';

const DbModule = TypeOrmModule.forRoot({
  ...dataSourceOptions,
  entities: [User, Goal, Habit],
});

@Module({
  imports: [DbModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
