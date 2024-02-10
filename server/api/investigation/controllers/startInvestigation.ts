import { Investigation, Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function startInvestigation(investigationDescription: string, complaintId: number): Promise<Investigation> {
  try {
    const complaint: any = await prisma.complaint.findUnique({
      where: { id: complaintId },
      include: { institution: { include: { office: true } } },
    });
    if (!complaint) throw new Error(`Complaint with id ${complaintId} not found`);
    const officeId = complaint.institution.office.id;
    const investigation: Investigation = await prisma.investigation.create({
      data: {
        description: investigationDescription,
        complaint: { connect: { id: complaintId } },
        office: { connect: { id: officeId } },
      },
    });
    if (!investigation) throw new Error(`Investigation not created`);
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
