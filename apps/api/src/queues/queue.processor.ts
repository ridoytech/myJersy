import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import type { Job } from 'bullmq';

@Processor('background-jobs')
export class BackgroundJobProcessor extends WorkerHost {
  private readonly logger = new Logger(BackgroundJobProcessor.name);

  async process(job: Job<any, any, string>): Promise<any> {
    this.logger.log(`Processing background job ${job.id} of type: ${job.name}`);
    
    // Simulate background processing (e.g. image compression, watermarking)
    return {
      status: 'completed',
      processedAt: new Date().toISOString(),
      jobId: job.id,
    };
  }
}
