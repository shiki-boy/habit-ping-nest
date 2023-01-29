import {
  Body,
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';

import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() goalData: CreateGoalDto, @Request() req) {
    return this.goalService.create(goalData, req.user);
  }
}
