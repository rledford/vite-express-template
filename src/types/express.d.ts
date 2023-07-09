export {};

declare global {
  namespace Express {
    export interface Request {
      user?: unknown; // replace with a User type
    }
    export interface Response {
      data?: unknown;
    }
  }
}
