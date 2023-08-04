import { User } from '../users/models';

declare module 'knex/types/tables' {
  interface Tables {
    users: User;
    notes: {
      id: number;
      authorid: number;
    };
  }
}
