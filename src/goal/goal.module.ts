import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Goal } from './goal.entity';
import { Habit } from './habit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Goal, Habit])],
  controllers: [GoalController],
  providers: [GoalService],
})
export class GoalModule {}
