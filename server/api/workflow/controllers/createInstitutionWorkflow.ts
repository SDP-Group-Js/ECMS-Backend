import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Creates a workflow for an Instition/Division/Branch/Office
 *
 * @param officeId - The ID of the office.
 * @param stages - A list of stages
 * @param name - The name of the workflow
 * @param description - The description of the workflow
 * @returns The created workflow.
 * @throws Error if the institution/office is not found.
 */

export default async function createInstitutionWorkflow(officeId: string, stages: string[], name: string, description: string) {
  try {
    if (officeId.length > 0) {
      const office = await prisma.office.findUnique({
        where: {
          id: officeId,
        },
      });

      if (office == null) throw new Error('Invalid OfficeId');

      const newWorkflow = await prisma.workflow.create({
        data: {
          name: name,
          description: description,
          stages: stages,
          office: {
            connect: {
              id: officeId,
            },
          },
        },
      });

      return newWorkflow;
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        console.log('There is a unique constraint violation, a new workflow cannot be created with this email');
      }
    }
    throw error;
  }
}
