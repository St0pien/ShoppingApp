export class AppError extends Error {
  constructor(
    readonly statusCode: number,
    message: string
  ) {
    super(message);
  }

  toString() {
    return this.message;
  }
}
