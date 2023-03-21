import { Controller, Get, Inject, Injectable } from '@nestjs/common';
import { ICommit } from 'src/domain/ports/commit';

@Injectable()
@Controller('commits')
export class CommitUseCase {
  constructor(@Inject('Commit') private readonly commitRepository: ICommit) {}

  @Get()
  async getAllCommits(): Promise<any> {
    const data = (await this.commitRepository.getAll()).data;
    return {
      data,
    };
  }
}
