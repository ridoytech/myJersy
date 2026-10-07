import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { BackgroundJobProcessor } from './queue.processor.js';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
      },
    }),
    BullModule.registerQueue({
      name: 'background-jobs',
    }),
  ],
  providers: [BackgroundJobProcessor],
  exports: [BullModule],
})
export class QueueModule {}
