import { Request, Response } from 'express';

export const reqSpy = () => ({} as Request);
export const resSpy = () =>
  ({
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    end: vi.fn().mockReturnThis()
  } as unknown as Response);

export const nextSpy = () => vi.fn();

export const expressSpy = () => ({
  req: reqSpy(),
  res: resSpy(),
  next: nextSpy()
});
