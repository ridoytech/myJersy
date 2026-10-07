import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service.js';
import { StandardSchemaPipe } from './common/pipes/standard-schema.pipe.js';
import { LoginSchema, type LoginInput } from '@repo/shared';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth() {
    return this.appService.getHealthStatus();
  }

  @Post('auth/login-check')
  validateLogin(@Body(new StandardSchemaPipe(LoginSchema)) body: LoginInput) {
    return {
      success: true,
      email: body.email,
      message: 'Validated successfully with Standard Schema & Zod',
    };
  }
}
