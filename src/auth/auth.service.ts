import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(pass, user.password);

    if (user && isPasswordCorrect) {
      const { password: _, ...result } = user; // eslint-disable-line
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.uid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
