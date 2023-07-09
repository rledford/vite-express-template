export abstract class CustomError extends Error {
  readonly statusCode: number;

  constructor(message = 'Error', status = 500) {
    super(message);
    this.statusCode = status;
  }
}

export class BadRequestError extends CustomError {
  constructor(message = 'Bad request') {
    super(message, 400);
  }
}

export class UnauthorizedError extends CustomError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

export class ForbiddenError extends CustomError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

export class NotFoundError extends CustomError {
  constructor(message = 'Not found') {
    super(message, 404);
  }
}

export class InternalError extends CustomError {
  constructor(message = 'Internal error') {
    super(message, 500);
  }
}
