import { NestFactory } from '@nestjs/core';
import dotenv from 'dotenv';

import 'module-alias/register';

dotenv.config();

import { LoggerService } from 'src/modules/logger/logger.service';

import { SeedModule } from './seed.module';

async function main() {
  const logger = new LoggerService();
  const context = await NestFactory.createApplicationContext(SeedModule, { logger });

  await context.init();
  await context.close();
}

(async () => {
  try {
    await main();
  } catch (e) {
    console.error(e);
  }
})();
