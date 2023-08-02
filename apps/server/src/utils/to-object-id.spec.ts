import { ObjectId } from 'mongodb';
import { toObjectId } from './to-object-id';

describe('toObjectId', () => {
  describe('from existing ObjectId', () => {
    it('should return the ObjectId', () => {
      const id = new ObjectId();
      expect(toObjectId(id)).toEqual(id);
    });
  });

  describe('from string', () => {
    it('should return an ObjectId', () => {
      const stringId = new ObjectId().toHexString();
      const result = toObjectId(stringId);

      expect(result).toBeInstanceOf(ObjectId);
      expect(result.toHexString()).toEqual(stringId);
    });

    it('should throw error if invalid', () => {
      expect(() => toObjectId('INVALID')).throws();
    });
  });
});
