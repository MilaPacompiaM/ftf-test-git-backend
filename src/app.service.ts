import { Injectable } from '@nestjs/common';
import { Octokit } from '@octokit/core';
import { OctokitResponse } from '@octokit/types';

@Injectable()
export class AppService {
  async getCommits(): Promise<OctokitResponse<any>> {
    const token = process.env.GITHUB_TOKEN;
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
