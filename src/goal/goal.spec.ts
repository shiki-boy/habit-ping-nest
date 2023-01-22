import { Test, TestingModule } from '@nestjs/testing';
import { Goal } from './goal';

describe('Goal', () => {
  let provider: Goal;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Goal],
    }).compile();

    provider = module.get<Goal>(Goal);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
