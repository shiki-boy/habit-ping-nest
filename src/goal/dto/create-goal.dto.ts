import { IsNotEmpty, IsPositive } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  @IsPositive()
  readonly points: number;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly habitId: string;
}
