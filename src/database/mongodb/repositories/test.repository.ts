import { Db } from 'mongodb';
import { TestRepository } from '@/database/types';
import { baseRepository } from './base.repository';

export const testRepository = (db: Db): TestRepository => {
  const collection = db.collection('test');

  return {
    ...baseRepository(collection)
  };
};
