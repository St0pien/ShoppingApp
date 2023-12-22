import { DatabaseError } from '../errors';
import { DatabaseErrMessage } from '../errors/messages';

export async function kyselyErrorAdapter<Result>(
  callback: () => Promise<Result>
) {
  try {
    return await callback();
  } catch (e) {
    if ((e as { code: string }).code === 'ECONNREFUSED') {
      throw new DatabaseError(DatabaseErrMessage.NoResponse);
    }

    throw new DatabaseError(DatabaseErrMessage.QueryFailed);
  }
}
