import { Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function completeInvestigationStage(investigationStageId: number) {
  try {
    // Fetch the current investigation stage
    const currentStage = await prisma.investigationStage.findUnique({
      where: { id: investigationStageId },
      include: {
        investigation: true,
      },
    });
    if (!currentStage) throw new Error('Investigation stage not found');

    // Update the status of the current stage to "Completed"
    await prisma.investigationStage.update({
      where: { id: investigationStageId },
      data: { status: 'Completed' },
    });

    // Check if there is another stage with +1 order
    const nextStage = await prisma.investigationStage.findFirst({
      where: {
        investigationId: currentStage.investigationId,
        order: currentStage.order + 1,
      },
    });

    if (nextStage) {
      // If the next stage exists, mark its status as "Ongoing"
      await prisma.investigationStage.update({
        where: { id: nextStage.id },
        data: { status: 'Ongoing' },
      });
    } else {
      // If the next stage does not exist, mark the investigation as "Completed"
      await prisma.investigation.update({
        where: { id: currentStage.investigationId },
        data: { status: 'Completed' },
      });
    }

    return currentStage;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error('Unique constraint violation:', error.message);
      } else if (error.code === 'P2022') {
        console.error('Record not found:', error.message);
      } else {
        console.error('Prisma Client Known Request Error:', error.message);
      }
    }
    throw error;
  }
}
