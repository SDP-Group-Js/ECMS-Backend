import { Prisma } from "@prisma/client"
import prisma from "../../../../prisma/client"

/**
 * Creates a workflow for an Instition/Division/Branch/Office
 *
 * @param institutionId - The ID of the institution.
 * @param officeId - The optional ID of the office.
 * @param stages - A list of stages
 * @param name - The name of the workflow
 * @param description - The description of the workflow
 * @returns The created workflow.
 * @throws Error if the institution/office is not found.
 */

export default async function createInstitutionWorkflow(
  institutionId: string,
  officeId: string,
  stages: string[],
  name: string,
  description: string
) {
  try {
    if (officeId.length > 0) {

      const office = await prisma.office.findUnique({
        where: {
          id: officeId
        }
      })
  
      if (office == null) throw new Error("Invalid OfficeId")
  
      const newWorkflow = await prisma.workflow.create({
        data: {
          name: name,
          description: description,
          stages: stages,
          institution: {
            connect: {
              id: office?.institutionId
            }
          },
          office: {
            connect: {
              id: officeId
            }
          }
        }
      })
  
      return newWorkflow
    }
  
    const newWorkflow = await prisma.workflow.create({
      data: {
        name: name,
        description: description,
        stages: stages,
        institution: {
          connect: {
            id: institutionId
          }
        },
      }
    })

    return newWorkflow
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new workflow cannot be created with this email"
        )
      }
    }
    throw error
  }
}