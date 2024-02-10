import { Action, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function captureAction(
  investigationStageId: number,
  actionName: string,
  actionDescription: string | null | undefined,
  actionUserId: string,
): Promise<Action> {
  try {
    const action: Action | null = await prisma.action.create({
      data: {
        investigationStage: { connect: { id: investigationStageId } },
        name: actionName,
        description: actionDescription,
        user: { connect: { id: actionUserId } },
      },
    });
    if (!action) throw new Error(`Action not created`);
    return action;
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
