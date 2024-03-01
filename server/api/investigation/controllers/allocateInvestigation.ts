import { Investigation, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function allocateInvestigation(investigationId: number, officeId: string): Promise<Investigation> {
  try {
    const investigation: Investigation = await prisma.investigation.update({
      where: { id: investigationId },
      data: { office: { connect: { id: officeId } }, status: 'Ongoing' },
    });
    if (!investigation) throw new Error(`Investigation with ID ${investigationId} not found`);
    return investigation;
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
