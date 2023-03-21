import { DynamicModule, Module } from '@nestjs/common';
import { InMemoryCommitGithub } from './repositories/commit/github/memory';
import { CommitUseCase } from 'src/application/commit/getAll';
import { EnvironmentConfigService } from './config/environment-config/environment-config.service';

export class RegisterProxy<T> {
  constructor(private readonly provider: T) {}
  getInstance(): T {
    return this.provider;
  }
}

@Module({
  imports: [],
})
export class RegisterModule {
  static COMMIT = 'Commit';
  static CONFIG = 'Config';

  static register(): DynamicModule {
    return {
      module: RegisterModule,
      providers: [
        {
          inject: [InMemoryCommitGithub],
          provide: RegisterModule.COMMIT,
          useFactory: (commitRepository: InMemoryCommitGithub) =>
            new RegisterProxy(new CommitUseCase(commitRepository)),
        },
        {
          inject: [EnvironmentConfigService],
          provide: RegisterModule.CONFIG,
          useFactory: (config: EnvironmentConfigService) =>
            new RegisterProxy(new InMemoryCommitGithub(config)),
        },
      ],
      exports: [RegisterModule.COMMIT, RegisterModule.CONFIG],
    };
  }
}
