# Backend API Development

References 

Prisma ORM: https://www.prisma.io/docs/orm/prisma-client/queries/crud

The API routes are divided into modules. There is one router file for each and will store all the routers for that module. 

Example

```
import express, { Router, Request, Response } from 'express'

const workflowRouter: Router = express.Router()

workflowRouter.post("/institution", async (req: Request, res: Response) => {
  const [data, institutionId] = req.body;

  // controller to create a new institution workflow
  const newInstitutionWorkflow = await createInstitutionWorkflow(data, institutionId);

  return res.json(newInstitutionWorkflow)
})

export default workflowRouter
```

Example of controller
```
//controller is a function that does a particular function
async function createInstitutionWorkflow (data, institutionId) {
   await prisma.institution.update({
    where: {
        id: institutionId
    },
    data: {
        workflows: {
            create: {
                data: data
            }
        }
    }
   })
}
```