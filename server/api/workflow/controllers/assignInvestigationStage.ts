import { Prisma } from "@prisma/client"
import prisma from "../../../../prisma/client"

/**
 * Starts an investigation for a complaint in a specific institution.
 *
 * @param investigationStageId - The ID of the investigation stage.
 * @param officeId - The Id of the Office responsible for investigation stage.
 * @param officers - The ids of officers to be assigned
 * @returns The updated investigation with workflow.
 * @throws Error if the institution is not found.
 */

export default async function assignInvestigationStage(
  investigationStageId: number,
  officeId: string,
  officers: string[]
) {
  try {
    // let setResponsibleOffice = {}

    // if (officeId) {
    //   setResponsibleOffice = {
    //     responsibleOffice: {
    //       connect: {
    //         id: officeId
    //       }
    //     }
    //   }
    // }
    const updatedInvestigation = await prisma.investigationStage.update({
      where: {
        id: investigationStageId
      },
      data: {
        officeId: officeId,
        assignedOfficers: {
          connect: [...officers.map((officer) => ({ id: officer }))]
        }
      }
    })

    return updatedInvestigation
  } catch (error) {
    console.log(error)
    throw error
  }
}
