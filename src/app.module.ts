import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

const {
  POSTGRES_DB: database,
  POSTGRES_PASSWORD: password,
  POSTGRES_USER: username,
  POSTGRES_HOST: host,
} = process.env;

const DbModule = TypeOrmModule.forRoot({
  type: 'postgres',
  host,
  port: 5432,
  username,
  password,
  database,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*.js'],
  synchronize: true,
  // logging: true,
});

@Module({
  imports: [DbModule, UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
