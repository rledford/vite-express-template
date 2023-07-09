import { NotFoundError } from '@/errors';
import { toObjectId } from '@/utils';
import { Collection, ObjectId } from 'mongodb';
import { CreateJournalDTO, JournalDTO, JournalDTOSchema } from '../dtos';
import { JournalEntity } from '../entities';

type Deps = {
  collection: Collection<JournalEntity>;
};

export type JournalService = {
  getOne: (id: string | ObjectId) => Promise<JournalEntity>;
  getMany: () => Promise<Array<JournalEntity>>;
  create: (dto: CreateJournalDTO) => Promise<JournalEntity>;
  updateOne: (id: string | ObjectId, dto: CreateJournalDTO) => void;
  deleteOne: (id: string | ObjectId) => Promise<void>;
  createDTO: (entity: JournalEntity) => JournalDTO;
  createEntity: (data: Partial<JournalDTO | JournalEntity>) => JournalEntity;
};

export const journalService = ({ collection }: Deps): JournalService => {
  return {
    async getOne(id) {
      const result = await collection.findOne({
        _id: toObjectId(id)
      });

      if (!result) throw new NotFoundError();

      return result;
    },

    async getMany() {
      const cursor = collection.find();

      return new Promise((resolve, reject) => {
        const result: Array<JournalEntity> = [];
        const stream = cursor.stream();

        stream.on('data', (data) => result.push(data));
        stream.on('end', () => resolve(result));
        stream.on('error', reject);
      });
    },

    async create(dto) {
      const entity = this.createEntity(dto);
      await collection.insertOne(entity);
      return entity;
    },

    async updateOne(id, dto) {
      const _id = ObjectId.createFromHexString(id.toString());
      await collection.updateOne(
        { _id },
        { $set: { ...dto, updatedAt: new Date() } }
      );
    },

    async deleteOne(id) {
      const _id = toObjectId(id);
      await collection.deleteOne({ _id });
    },

    createDTO(data: JournalEntity) {
      return JournalDTOSchema.parse({
        ...data,
        id: data._id.toHexString(),
        calendarDate: data.calendarDate.toISOString(),
        createdAt: data.createdAt.toISOString(),
        updatedAt: data.updatedAt.toISOString()
      });
    },

    createEntity(data) {
      const now = new Date();

      return {
        _id: new ObjectId(),
        title: data.title || '',
        body: data.body || '',
        calendarDate: data.calendarDate ? new Date(data.calendarDate) : now,
        createdAt: now,
        updatedAt: now
      };
    }
  };
};
