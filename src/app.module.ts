import { Habit } from './goal/habit.entity';
import { Goal } from './goal/goal.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions } from './db/dataSource';
import { User } from './user/user.entity';
import { GoalModule } from './goal/goal.module';

const DbModule = TypeOrmModule.forRoot({
  ...dataSourceOptions,
  entities: [User, Goal, Habit],
});

@Module({
  imports: [DbModule, UserModule, AuthModule, GoalModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
