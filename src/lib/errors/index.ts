import { AppError } from './Error';
import { DatabaseErrMessage } from './messages';

export class DatabaseError extends AppError {
  constructor(message: DatabaseErrMessage) {
    super(500, message);
  }
}
