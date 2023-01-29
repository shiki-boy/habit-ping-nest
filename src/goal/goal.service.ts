import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goal } from './goal.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,
  ) {}

  create(data: CreateGoalDto, user: User): void {
    const { habitId, description, points } = data;

    console.log({ user });

    const newGoal = new Goal();
    // newGoal.habit =
  }
}
