import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { Goal } from './goal';

@Module({
  controllers: [GoalController],
  providers: [Goal, GoalService],
})
export class GoalModule {}
