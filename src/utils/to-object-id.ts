import { BadRequestError } from '@/errors';
import { ObjectId } from 'mongodb';

export const toObjectId = (id: string | ObjectId) => {
  if (id instanceof ObjectId) return id;

  try {
    return ObjectId.createFromHexString(id);
  } catch (err) {
    throw new BadRequestError('Invalid ID');
  }
};
