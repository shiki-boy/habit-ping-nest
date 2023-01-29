import { MigrationInterface, QueryRunner } from 'typeorm';
import { HabitNames } from './../../goal/habit.entity';

const habitNames = Object.values(HabitNames);

export class loadHabits1674982000670 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log({ habitNames });
    habitNames.forEach(async (habitName) => {
      await queryRunner.query(
        `INSERT INTO habit (name) VALUES ('${habitName}')`,
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    habitNames.forEach(async (habitName) => {
      await queryRunner.query(`DELETE FROM habit WHERE name='${habitName}'`);
    });
  }
}
