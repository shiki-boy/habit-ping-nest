import { DataSource, DataSourceOptions } from 'typeorm';

const {
  POSTGRES_DB: database,
  POSTGRES_PASSWORD: password,
  POSTGRES_USER: username,
  POSTGRES_HOST: host,
} = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host,
  port: 5432,
  username,
  password,
  database,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
