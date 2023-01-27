import { Entity, Column, OneToMany } from 'typeorm';

import { AbstractBaseEntity } from 'src/utils/abstract.entity';
import { Goal } from './goal.entity';

export enum HabitNames {
  WORK_OUT = 'Work Out',
  SLEEP = 'Sleep',
  READING = 'Reading',
  EAT_FOOD = 'Eat Food',
  DIET = 'Diet',
  ART = 'Art',
  MUSIC = 'Music',
  TRAVEL = 'Travel',
  GAMING = 'Gaming',
}

@Entity('habit')
export class Habit extends AbstractBaseEntity {
  @Column({ type: 'enum', enum: HabitNames, unique: true })
  name: string;

  @OneToMany(() => Goal, (goal) => goal.habit)
  goals: Goal[];
}
