import { DeleteResult, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { CreateGoalDto } from './dto/create-goal.dto';
import { Goal } from './goal.entity';
import { Habit } from './habit.entity';

@Injectable()
export class GoalService {
  constructor(
    @InjectRepository(Goal)
    private goalRepository: Repository<Goal>,

    @InjectRepository(Habit)
    private habitRepository: Repository<Habit>,
  ) {}

  async create(data: CreateGoalDto, user: User): Promise<Goal> {
    const { habitUid, description, points, duration, date } = data;

    const habit = await this.habitRepository.findOne({
      where: { uid: habitUid },
    });

    const newGoal = new Goal();
    newGoal.habit = habit;
    newGoal.points = points;
    newGoal.duration = duration;
    newGoal.date = date;
    newGoal.description = description;
    newGoal.user = user;

    return this.goalRepository.save(newGoal);
  }

  async list(user: User): Promise<Goal[]> {
    return this.goalRepository.findBy({ user: { uid: user.uid } });
  }

  async remove(uid: string): Promise<DeleteResult> {
    return this.goalRepository.delete({ uid });
  }

  async listHabits(): Promise<Habit[]> {
    return this.habitRepository.find();
  }
}
