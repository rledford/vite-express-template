type CountResult = number;

export interface BaseRepository<T> {
  insertOne: (data: Partial<T>) => Promise<T>;
  insertMany: (data: Array<Partial<T>>) => Promise<CountResult>;
  findOne: (filter: Partial<T>) => Promise<T | null>;
  findMany: (filter: Partial<T>) => Promise<T[]>;
  updateOne: (filter: Partial<T>, updates: Partial<T>) => Promise<CountResult>;
  updateMany: (filter: Partial<T>, updates: Partial<T>) => Promise<CountResult>;
  deleteOne: (filter: Partial<T>) => Promise<CountResult>;
  deleteMany: (filter: Partial<T>) => Promise<CountResult>;
}
