import { NestFactory } from '@nestjs/core';
import { CommitModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(CommitModule, { cors: true });
  await app.listen(3000);
}
bootstrap();
