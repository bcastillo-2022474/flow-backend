import { Response, Router } from "express";

const handleError = (res: Response) => (err: any) => {
  console.log(err);
  res.status(500).send(err);
  return null;
};
const createBasicRoute = (
  entityName: string,
  { findMany, create, findUnique, update, delete: deleteEntity }: any
): Router => {
  const router = Router();

  router
    .route(`/${entityName}`)
    .get(async (req, res) => {
      const entities = await findMany().catch(handleError(res));
      if (!entities) return;

      if (entities.length === 0) {
        res.status(404).send(`No ${entityName} found`);
        return;
      }

      res.json(entities);
    })
    .post(async (req, res) => {
      const entity = await create({
        data: req.body,
      }).catch(handleError(res));

      if (!entity) return;

      res.json(entity);
    });

  router
    .route(`/${entityName}/:id`)
    .get(async (req, res) => {
      const entity = await findUnique({
        where: {
          id: req.params.id,
        },
      }).catch(handleError(res));

      if (!entity) return;
      res.json(entity);
    })
    .put(async (req, res) => {
      const entity = await update({
        where: {
          id: req.params.id,
        },
        data: req.body,
      }).catch(handleError(res));

      if (!entity) return;

      res.json(entity);
    })
    .delete(async (req, res) => {
      const entity = await deleteEntity({
        where: {
          id: req.params.id,
        },
      }).catch(handleError(res));

      if (!entity) return;

      res.json(entity);
    });

  return router;
};

export default createBasicRoute;
