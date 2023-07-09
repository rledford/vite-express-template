import { withResData, withResEmpty } from '@/utils';
import { Router } from 'express';
import { CreateJournalDTOSchema } from '../dtos';
import { JournalService } from '../services';

type Deps = {
  service: JournalService;
};

export const journalController = ({ service }: Deps): Router => {
  const router = Router();

  router.get(
    '/',
    withResData(async () => {
      return (await service.getMany()).map(service.createDTO);
    })
  );

  router.get(
    '/:id',
    withResData(async (req) => {
      return service.createDTO(await service.getOne(req.params.id));
    })
  );

  router.post(
    '/',
    withResData(async (req) => {
      const dto = CreateJournalDTOSchema.parse(req.body);
      return service.createDTO(await service.create(dto));
    })
  );

  router.put(
    '/:id',
    withResEmpty(async (req) => {
      await service.updateOne(
        req.params.id,
        CreateJournalDTOSchema.parse(req.body)
      );
    })
  );

  router.delete(
    '/:id',
    withResEmpty(async (req) => {
      await service.deleteOne(req.params.id);
    })
  );

  return router;
};
