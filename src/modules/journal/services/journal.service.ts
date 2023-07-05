import { Collection, ObjectId } from 'mongodb';
import { CreateJournalDTO, JournalDTO } from '../dtos';
import { JournalEntity } from '../entities';

type Deps = {
  collection: Collection<JournalEntity>;
};

export type JournalService = {
  getOne: (id: string | ObjectId) => Promise<JournalDTO>;
  getMany: () => Promise<Array<JournalDTO>>;
  create: (dto: CreateJournalDTO) => Promise<JournalDTO>;
  update: (id: string | ObjectId, dto: CreateJournalDTO) => void;
  delete: (id: string | ObjectId) => Promise<void>;
  createEntity: (data: Partial<JournalDTO | JournalEntity>) => JournalEntity;
};

export const journalService = ({ collection }: Deps): JournalService => {
  return {
    async getOne(id) {
      const result = await collection.findOne({
        _id: ObjectId.createFromHexString(id.toString())
      });

      if (!result) {
        throw new Error('Not found');
      }

      return JournalDTO.fromEntity(result);
    },
    async getMany() {
      const result: Array<JournalDTO> = [];
      const cursor = collection.find();
      for await (const doc of cursor) {
        result.push(JournalDTO.fromEntity(doc));
      }

      return result;
    },
    async create(dto) {
      const journal = this.createEntity(dto);

      await collection.insertOne(journal);

      return JournalDTO.fromEntity(journal);
    },
    async update(id, dto) {
      const _id = ObjectId.createFromHexString(id.toString());
      await collection.updateOne(
        { _id },
        { $set: { ...dto, updatedAt: new Date() } }
      );
    },
    async delete(id) {
      const _id = ObjectId.createFromHexString(id.toString());
      await collection.deleteOne({ _id });
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
