import { Injectable } from '@nestjs/common';
import { IConfig } from 'src/domain/config/config';

@Injectable()
export class EnvironmentConfigService implements IConfig {
  getGithubToken(): string {
    return process.env.GITHUB_TOKEN;
  }
}
