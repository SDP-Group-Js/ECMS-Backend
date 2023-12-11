# ECMS Backend
This would be backend of the main system used by wildlife, forestry, and environment institutions to view and manage complaints.

## Install
```
git clone https://github.com/SDP-Group-Js/ECMS.git

cd ECMS-Backend

npm install

npm run dev
```
You would need to go into both frontend and backend directories and run this code.

## How start to developing
The server directory contains an api directory which contains all the main routes. The assigned member would be responsible for their route.

First checkout your remote module branch

```
git fetch [module-branch-name]
git checkout [module-branch-name]
```

Then create your feature branch within your module branch
```
git checkout -b [module-branch-name]/[feature-name]
git add .
git commit -m "Starting work on [module-branch-name]/[feature-name]
git push -u origin [module-branch-name]/[feature-name]
```

## How to keep contributing
Once you have started development and you are implement your module feature. Make sure to commit your changes once you have done a certain amount of work. For example completing a function or part of a function that can be commit.

Once you are ready to make a commit do the follow steps
```
git add ./file-name
git commit -m "Commit Message"
git push -u origin [module-branch-name]/[feature-name]
```
**Make sure you are working in your module feature branch!!!**

If you are encountering bugs and need help with fix it. Create a bugfix branch
```
git add ./file-name
git commit -m "Describe bug/error"
git push -u origin bugfix/[module-name]/[bug-name]
```

## How to pull changes from develop branch
**Make sure that you are in branch that you want to merge changes**
```
git fetch
git merge develop
```

To push changes to your remote repo
```
git push -u origin [module-name]/[feature-name]
```


## Backend API Development

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

## Prisma ORM setup
To generate the updated Prisma Client
```
npx prisma generate
```

If chagnes are made and you want to update the schema
```
npx prisma db push
```
**Warning!** This could possible change the schema and there could be **data loss**