import { withErrorHandling } from '@/utils';
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
    withErrorHandling(async (req, res) => {
      const result = await service.getMany();

      res.status(200).json(result);
    })
  );

  router.get(
    '/:id',
    withErrorHandling(async (req, res) => {
      const result = await service.getOne(req.params.id);

      res.status(200).json(result);
    })
  );

  router.post(
    '/',
    withErrorHandling(async (req, res) => {
      const dto = CreateJournalDTOSchema.parse(req.body);
      const result = await service.create(dto);

      res.status(200).json(result);
    })
  );

  router.put(
    '/:id',
    withErrorHandling(async (req, res) => {
      await service.update(
        req.params.id,
        CreateJournalDTOSchema.parse(req.body)
      );

      res.status(204).end();
    })
  );

  router.delete(
    '/:id',
    withErrorHandling(async (req, res) => {
      await service.delete(req.params.id);

      res.status(204).end();
    })
  );

  return router;
};
