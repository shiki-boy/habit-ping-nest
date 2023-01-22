import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './user.entity';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('test')
  async getAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async create(@Body() userData: CreateUserDto) {
    return this.userService.create(userData);
  }
}
