import { expressSpy } from '@/test/spies';
import { NextFunction, Request, Response } from 'express';
import { withResData, withResEmpty } from './with-response';

describe('withResponse', () => {
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
    ({ req: reqSpy, res: resSpy, next: nextSpy } = expressSpy());
  });

  describe('withResData', () => {
    it('should send json response when handler succeeds', async () => {
      await withResData(mockHandler)(reqSpy, resSpy, nextSpy);

      expect(resSpy.status).toHaveBeenCalledWith(200);
      expect(resSpy.json).toHaveBeenCalledWith({ data: mockData });
    });

    it('should call next with error when handler fails', async () => {
      await withResData(mockFailingHandler)(reqSpy, resSpy, nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe('withResEmpty', () => {
    it('should send no-content response when handler succeeds', async () => {
      await withResEmpty(mockHandler)(reqSpy, resSpy, nextSpy);

      expect(resSpy.status).toHaveBeenCalledWith(204);
      expect(nextSpy).toHaveBeenLastCalledWith();
    });

    it('should call next with error when handler fails', async () => {
      await withResData(mockFailingHandler)(reqSpy, resSpy, nextSpy);

      expect(nextSpy).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
