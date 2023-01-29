import { Entity, Column, ManyToOne } from 'typeorm';

import { AbstractBaseEntity } from 'src/utils/abstract.entity';
import { User } from '../user/user.entity';
import { Habit } from './habit.entity';

export enum StatusChoices {
  PENDING = 'Pending',
  COMPLETED = 'Completed',
  NOT_STARTED = 'Not Started',
  MISSED = 'Missed',
}

@Entity('goal')
export class Goal extends AbstractBaseEntity {
  @Column({ length: 32 })
  description: string;

  @Column()
  points: number;

  @Column({ type: 'interval' })
  duration: Date;

  @Column({ type: 'timestamp' })
  date: Date;

  @Column({
    type: 'enum',
    enum: StatusChoices,
    default: StatusChoices.NOT_STARTED,
  })
  status: StatusChoices;

  @ManyToOne(() => User, (user) => user.goals)
  user: User;

  @ManyToOne(() => Habit, (habit) => habit.goals)
  habit: Habit;
}
