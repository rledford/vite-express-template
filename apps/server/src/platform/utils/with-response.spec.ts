import { requestHandlerSpy } from '@/test/spies';
import { NextFunction, Request, Response } from 'express';
import { withResData, withResEmpty } from './with-response';
import { z } from 'zod';

describe('withResponse', () => {
  const MockData = z.object({
    name: z.literal('mock'),
  });
  const InvalidMockData = z.object({
    name: z.literal('invalid'),
  });
  const mockData = { name: 'mock' };
  const mockHandler = () => {
    return Promise.resolve(mockData);
  };
  const mockFailingHandler = () => {
    throw new Error();
  };

  let reqSpy: Request;
  let resSpy: Response;
  let nextSpy: NextFunction;

  beforeEach(() => {
    ({ req: reqSpy, res: resSpy, next: nextSpy } = requestHandlerSpy());
  });

  describe('withResData', () => {
    it('should send json response when handler succeeds', async () => {
      await withResData(MockData)(mockHandler)(reqSpy, resSpy, nextSpy);

      expect(resSpy.status).toHaveBeenCalledWith(200);
      expect(resSpy.json).toHaveBeenCalledWith({ data: mockData });
    });

    it('should call next with error when handler fails', async () => {
      await withResData(MockData)(mockFailingHandler)(reqSpy, resSpy, nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should call next with error when handler data does not match schema', async () => {
      await withResData(InvalidMockData)(mockHandler)(reqSpy, resSpy, nextSpy);

      expect(resSpy.json).not.toHaveBeenCalled();
      expect(nextSpy).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('withResEmpty', () => {
    it('should send no-content response when handler succeeds', async () => {
      await withResEmpty(mockHandler)(reqSpy, resSpy, nextSpy);

      expect(resSpy.status).toHaveBeenCalledWith(204);
      expect(resSpy.end).toHaveBeenCalled();
    });

    it('should call next with error when handler fails', async () => {
      await withResEmpty(mockFailingHandler)(reqSpy, resSpy, nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
