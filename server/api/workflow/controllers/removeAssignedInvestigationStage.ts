import prisma from '../../../../prisma/client';

/**
 * Unassigns a officer from a investigation stage
 *
 * @param investigationStageId - The ID of the investigation stage.
 * @param officers - The ids of officers to be unassigned
 * @returns The updated investigation with workflow.
 * @throws Error if the institution is not found.
 */

export default async function removeAssignedInvestigationStage(investigationStageId: number, officeId: string, officers: string[]) {
  try {
    const updatedInvestigation = await prisma.investigationStage.update({
      where: {
        id: investigationStageId,
      },
      data: {
        assignedOfficers: {
          disconnect: [...officers.map((officer) => ({ id: officer }))],
        },
      },
    });

    return updatedInvestigation;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
