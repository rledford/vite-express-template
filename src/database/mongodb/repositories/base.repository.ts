import { Collection } from 'mongodb';
import { BaseRepository } from '@/database/types/repositories';

export const baseRepository = <T>(
  collection: Collection
): BaseRepository<T> => {
  return {
    insertOne: async (data) => {
      return collection.insertOne(data) as Promise<T>;
    },
    insertMany: async (data) => {
      const result = await collection.insertMany(data);

      return result.insertedCount;
    },
    findOne: async (filter) => {
      return collection.findOne(filter) as Promise<T>;
    },
    findMany: async (filter) => {
      return collection.find(filter).limit(50).toArray() as Promise<T[]>;
    },
    updateOne: async (filter, updates) => {
      const result = await collection.updateOne(filter, updates);

      return result.matchedCount;
    },
    updateMany: async (filter, updates) => {
      const result = await collection.updateMany(filter, updates);

      return result.matchedCount;
    },
    deleteOne: async (filter) => {
      const result = await collection.deleteOne(filter);

      return result.deletedCount;
    },
    deleteMany: async (filter) => {
      const result = await collection.deleteMany(filter);

      return result.deletedCount;
    }
  };
};
