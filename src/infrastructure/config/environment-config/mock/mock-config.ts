import { Injectable } from '@nestjs/common';
import { IConfig } from 'src/domain/config/config';

@Injectable()
export class MockConfig implements IConfig {
  getGithubToken(): string {
    return 'some-token';
  }
}
