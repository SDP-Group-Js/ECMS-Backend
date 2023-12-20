import { Prisma } from "@prisma/client"
import prisma from "../../../../prisma/client"

/**
 * Updates Investigation Stage Details
 *
 * @param investigationId - The ID of the investigation.
 * @param institutionWorkflowId - The ID of the institution workflow.
 * @param workflow - Investigation Workflow
 * @returns The updated investigation with workflow.
 * @throws Error if the institution is not found.
 */

export default async function updateInvestigationStage(
  investigationStageId: number,
  description: string,
  status: string,
  tasks: string[]
) {
  try {
    const updatedInvestigation = await prisma.investigationStage.update({
      where: {
        id: investigationStageId
      },
      data: {
        description,
        status,
        tasks
      }
    })

    return updatedInvestigation
  } catch (error) {
    console.log(error)
    throw error
  }
}
