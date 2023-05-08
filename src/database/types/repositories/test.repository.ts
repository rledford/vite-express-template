import { TestDocument } from '@/database/types/models/test.model';
import { BaseRepository } from './base.repository';

export type TestRepository = BaseRepository<TestDocument>;
