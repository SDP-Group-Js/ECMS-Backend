import { Prisma } from "@prisma/client"
import prisma from "../../../../prisma/client"

/**
 * Starts an investigation for a complaint in a specific institution.
 *
 * @param investigationId - The ID of the investigation.
 * @param institutionWorkflowId - The ID of the institution workflow.
 * @returns The updated investigation with workflow.
 * @throws Error if the institution is not found.
 */

export default async function setInvestigationWorkflow(
  investigationId: number,
  institutionWorkflow: any
) {
  try {
    const investigation = await prisma.investigation.findUnique({
      where: {
        id: investigationId
      }
    })

    if (investigation) {
      if (investigation.institutionWorkflowId) {
        throw new Error("Can't change Workflow once it is set")
      }
    }

    const updatedInvestigation = await prisma.investigation.update({
      where: {
        id: investigationId
      },
      data: {
        institutionWorkflow: {
          connect: {
            id: institutionWorkflow.id
          }
        },
        investigationStages: {
          createMany: {
            data: [
              ...institutionWorkflow.stages.map(
                (stage: string, index: number) => {
                  return {
                    stageName: stage,
                    order: index + 1,
                    status: "Pending"
                  }
                }
              )
            ]
          }
        }
      },
      include: {
        investigationStages: {
          orderBy: {
            order: "asc"
          }
        }
      }
    })

    return updatedInvestigation
  } catch (error) {
    console.log(error)
    throw error
  }
}
