import express from 'express';
import request from 'supertest';
import { HealthService } from '../services';
import { healthController } from './health.controller';

describe('healthController', () => {
  const app = express();
  const mockService: HealthService = {
    getHealth: () => Promise.resolve({ uptime: 1 }),
  };

  const controller = healthController({ service: mockService });

  app.use(controller);

  describe('GET /', () => {
    it('should return status 200 and health dto', async () => {
      await request(app)
        .get('/')
        .expect(200)
        .expect(({ body }) => {
          expect(body).toMatchObject({
            data: {
              uptime: expect.any(Number),
            },
          });
        });
    });
  });
});
