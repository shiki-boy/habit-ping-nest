import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';
import { Entity, Column, BeforeInsert } from 'typeorm';

import { AbstractBaseEntity } from 'src/utils/abstract.entity';

const saltRounds = 10;

@Entity('user')
export class User extends AbstractBaseEntity {
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  @Column({ length: 32 })
  firstName: string;

  @Column({ length: 32 })
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
