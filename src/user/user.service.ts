import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { validate } from 'class-validator';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    // check uniqueness of email
    const { email, password, firstName, lastName } = dto;
    const qb = this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email });

    const user = await qb.getOne();

    if (user) {
      const errors = { email: 'email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.firstName = firstName;
    newUser.lastName = lastName;

    const errors = await validate(newUser);
    if (errors.length > 0) {
      console.log(errors);
      const _errors = { email: 'Userinput is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const savedUser = await this.usersRepository.save(newUser);
      return savedUser;
      // return this.buildUserRO(savedUser);
    }
  }
}
