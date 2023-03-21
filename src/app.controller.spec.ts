import { Test, TestingModule } from '@nestjs/testing';
import { CommitUseCase } from './application/commit/getAll';
import { MockConfig } from './infrastructure/config/environment-config/mock/mock-config';
import { InMemoryCommitGithub } from './infrastructure/repositories/commit/github/memory';

describe('Use cases', () => {
  let commitUseCase: CommitUseCase;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CommitUseCase],
      providers: [
        {
          provide: 'Config',
          useValue: new MockConfig(),
        },
        {
          provide: 'Commit',
          useValue: new InMemoryCommitGithub(new MockConfig()),
        },
      ],
    }).compile();

    commitUseCase = app.get<CommitUseCase>(CommitUseCase);
  });

  describe('Commit use cases', () => {
    it('should get all commits', async () => {
      const response = {
        data: [
          {
            sha: 'sha-1111111',
          },
          {
            sha: 'sha-2222222',
          },
        ],
      };
      jest
        .spyOn(InMemoryCommitGithub.prototype, 'getAll')
        .mockImplementation(
          () => new Promise((resolve) => resolve(response as any)),
        );
      expect(await commitUseCase.getAllCommits()).toStrictEqual(response);
    });
  });
});
