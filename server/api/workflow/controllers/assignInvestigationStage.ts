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

export default async function assignInvestigationStage(
  investigationStageId: number,
  officeId: string,
  officers: string[]
) {
  try {
    let setResponsibleOffice = {}

    if (officeId) {
      setResponsibleOffice = {responsibleOffice: {
        connect: {
            id: officeId
        }
      },
    }}
    const updatedInvestigation = await prisma.investigationStage.update({
      where: {
        id: investigationStageId
      },
      data: {
        ...setResponsibleOffice,
        assignedOfficers: {
            connect: [...officers.map((officer) => ({id: officer}) )]
        }
      },
    })

    return updatedInvestigation
  } catch (error) {
    console.log(error)
    throw error
  }
}
