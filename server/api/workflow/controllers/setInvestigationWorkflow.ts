import { Prisma } from "@prisma/client"
import prisma from "../../../../prisma/client"

/**
 * Starts an investigation for a complaint in a specific institution.
 *
 * @param investigationId - The ID of the investigation.
 * @param institutionWorkflowId - The ID of the institution workflow.
 * @param workflow - Investigation Workflow
 * @returns The updated investigation with workflow.
 * @throws Error if the institution is not found.
 */

export default async function setInvestigationWorkflow(
  investigationId: number,
  institutionWorkflowId: number,
  workflow: string[]
) {
  try {
    const updatedInvestigation = await prisma.investigation.update({
      where: {
        id: investigationId,
      },
      data: {
        institutionWorkflow: {
          connect: {
            id: institutionWorkflowId
          }
        },
        workflow: workflow
      }
    })
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