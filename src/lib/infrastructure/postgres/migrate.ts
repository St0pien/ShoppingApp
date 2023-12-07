import { FileMigrationProvider, Migrator } from 'kysely';
import fs from 'fs/promises';
import path from 'path';
import { pgClient } from './db';

(async () => {
  const migrator = new Migrator({
    db: pgClient,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, 'migrations')
    })
  });

  const { error, results } = await migrator.migrateToLatest();

  console.log(error);
  console.log(results);

  await pgClient.destroy();
})().catch((e) => console.log(e));
