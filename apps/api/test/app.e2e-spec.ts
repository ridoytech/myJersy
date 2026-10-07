import 'reflect-metadata';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module.js';

describe('App & Validation (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/health (GET)', async () => {
    const res = await request(app.getHttpServer()).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.backend).toBe('NestJS 12 ESM');
  });

  it('/auth/login-check (POST) - accepts valid body using Standard Schema', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login-check')
      .send({
        email: 'test@example.com',
        password: 'securePassword123',
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.email).toBe('test@example.com');
  });

  it('/auth/login-check (POST) - rejects invalid body with 400 using Standard Schema', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login-check')
      .send({
        email: 'not-an-email',
        password: '123',
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation failed');
    expect(Array.isArray(res.body.issues)).toBe(true);
  });

  it('/files/:id/download (GET) - validates UUID param using Standard Schema', async () => {
    const res = await request(app.getHttpServer()).get('/files/invalid-uuid-123/download');
    expect(res.status).toBe(400);
    expect(res.body.message).toBe('Validation failed');
  });
});
