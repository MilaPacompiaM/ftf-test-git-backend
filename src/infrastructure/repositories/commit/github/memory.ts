import { Injectable, Inject } from '@nestjs/common';
import { Octokit } from '@octokit/core';
import { OctokitResponse } from '@octokit/types';
import { IConfig } from 'src/domain/config/config';
import { ICommit } from 'src/domain/ports/commit';

@Injectable()
export class InMemoryCommitGithub implements ICommit {
  constructor(@Inject('Config') private readonly config: IConfig) {}

  async getAll(): Promise<OctokitResponse<any>> {
    const token = this.config.getGithubToken();
    const octokit = new Octokit({ auth: token });
    const response = octokit.request('GET /repos/{owner}/{repo}/commits', {
      owner: 'MilaPacompiaM',
      repo: 'ftf-test-git-backend',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    return response;
  }
}
