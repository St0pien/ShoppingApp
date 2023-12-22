export class AppError extends Error {
  constructor(readonly statusCode: number, message: string) {
    super(
      JSON.stringify({
        status: statusCode,
        message: message
      })
    );
  }

  toString() {
    return this.message;
  }
}
