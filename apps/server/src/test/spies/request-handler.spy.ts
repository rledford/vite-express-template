import { RequestContext } from '@/platform/context';
import { Request, Response } from 'express';

export const reqSpy = (ctx?: RequestContext) =>
  ({ context: ctx, headers: {} }) as Request;
export const resSpy = () =>
  ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis(),
  }) as unknown as Response;

export const nextSpy = () => vi.fn();

export const requestHandlerSpy = (ctx?: RequestContext) => ({
  req: reqSpy(ctx),
  res: resSpy(),
  next: nextSpy(),
});
