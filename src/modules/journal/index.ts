import { Db } from 'mongodb';
import { journalService } from './services';
import { JournalEntity } from './entities';
import { journalController } from './controllers/journal.controller';

type Deps = {
  db: Db;
};

export const journalModule = ({ db }: Deps) => {
  const collection = db.collection<JournalEntity>('journals');
  const service = journalService({ collection });
  const controller = journalController({ service });

  return {
    controller
  };
};
