// TO USE THIS FILE ADD THE ENTITIES TO THE ARRAY BELOW AND RUN IT WITH "npx ts-node .\createBasicRoute.ts"
import fs from "fs/promises";
import path from "path";

const createBasicRoute = (
  entityName: string,
): string => `import { Router } from "express";
import handleError from "../errorHadler";
import prisma from "../dao/connection"

const router = Router();

router
  .route("/${entityName}")
  .get(async (req, res) => {
    const ${entityName}s = await prisma.${entityName}.findMany().catch(handleError(res));
    if (!${entityName}s) return;

    if (${entityName}s.length === 0) {
      res.status(404).send("No ${entityName} found");
      return;
    }

    res.json(${entityName}s);
  })
  .post(async (req, res) => {
    const ${entityName} = await prisma.${entityName}.create({
      data: req.body,
    }).catch(handleError(res));

    if (!${entityName}) return;

    res.json(${entityName});
  });

router
  .route("/${entityName}/:id")
  .get(async (req, res) => {
    const ${entityName} = await prisma.${entityName}.findUnique({
      where: {
        id: req.params.id,
      },
    }).catch(handleError(res));

    if (!${entityName}) return;
    res.json(${entityName});
  })
  .put(async (req, res) => {
    const ${entityName} = await prisma.${entityName}.update({
      where: {
        id: req.params.id,
      },
      data: req.body,
    }).catch(handleError(res));

    if (!${entityName}) return;

    res.json(${entityName});
  })
  .delete(async (req, res) => {
    const ${entityName} = await prisma.${entityName}.delete({
      where: {
        id: req.params.id,
      },
    }).catch(handleError(res));

    if (!${entityName}) return;

    res.json(${entityName});
  });

export default router;
  `;

// here put the entities to create, also, remember to create the entity in
// the database first and to NOT override already created entities
const entities: string[] = [
  // "user",
  // "project",
  // "sprint",
  // "task",
  // "comment",
  // "column",
  // "attachment",
  // "test-entity",
  "OrganizationMembers",
  "Organization",
  "ProjectLevelPermission",
];
entities.forEach((entity) => {
  console.log(path.join(__dirname, "src/routes", `${entity}.routes.ts`));
  fs.writeFile(
    path.join(__dirname, "src/routes", `${entity}.routes.ts`),
    createBasicRoute(entity),
  );
});
