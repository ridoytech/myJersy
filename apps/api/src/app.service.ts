import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealthStatus() {
    return {
      status: 'ok',
      service: 'Myjarsey API',
      runtime: 'Node.js 24 LTS',
      backend: 'NestJS 12 ESM',
      timestamp: new Date().toISOString(),
    };
  }
}
