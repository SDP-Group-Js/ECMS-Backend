import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Updates Institution Workflow
 *
 * @param investigationId - The ID of the investigation.
 * @param institutionWorkflowId - The ID of the institution workflow.
 * @returns The updated investigation with workflow.
 * @throws Error if the institution is not found.
 */

export default async function updateInstitutionWorkflow(id: number, stages: string[], name: string, description: string) {
  const updatedWorkflow = await prisma.workflow.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      description: description,
      stages: stages,
    },
  });

  return updatedWorkflow;
}
