import { Prisma } from "@prisma/client"
import prisma from "../../../../prisma/client"

export default async function createInstitutionWorkflow(
  institutionId: string,
  stages: string[],
  name: string,
  description: string
) {
  const newWorkflow = await prisma.workflow.create({
    data: {
      name: name,
      description: description,
      stages: stages,
      institution: {
        connect: {
          id: institutionId
        }
      }
    }
  })

  return newWorkflow
}