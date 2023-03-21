import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { CommitUseCase } from './application/commit/getAll';
import { InMemoryCommitGithub } from './infrastructure/repositories/commit/github/memory';
import { EnvironmentConfigService } from './infrastructure/config/environment-config/environment-config.service';

ConfigModule.forRoot();

@Module({
  imports: [EnvironmentConfigModule],
  controllers: [CommitUseCase],
  providers: [
    {
      provide: 'Config',
      useValue: new EnvironmentConfigService(),
    },
    {
      provide: 'Commit',
      useValue: new InMemoryCommitGithub(new EnvironmentConfigService()),
    },
  ],
})
export class CommitModule {}
