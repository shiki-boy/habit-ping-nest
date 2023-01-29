import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
  Delete,
} from '@nestjs/common';

import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Habit } from './habit.entity';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseGuards(JwtAuthGuard)
  @Get('habits')
  async listHabits(): Promise<Habit[]> {
    return await this.goalService.listHabits();
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Get('')
  async list(@Request() req) {
    return this.goalService.list(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() goalData: CreateGoalDto, @Request() req) {
    return this.goalService.create(goalData, req.user);
  }

  @Delete(':uid')
  async remove(@Param('uid') uid: string) {
    return this.goalService.remove(uid);
  }
}
