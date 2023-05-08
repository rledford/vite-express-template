import { TestRepository } from './repositories';

export interface Database {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  tests: TestRepository;
}
