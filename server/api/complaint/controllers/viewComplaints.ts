import { Complaint, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function viewComplaints(): Promise<Complaint[]> {
  return await prisma.complaint.findMany();
}

export async function viewComplaintsOfUser(userId: string): Promise<Complaint[]> {
  return await prisma.complaint.findMany({
    where: { complainerId: userId },
    include: {
      investigation: {
        include: {
          investigationStages: {
            include: { actions: { include: { user: true } } },
          },
        },
      },
      complainer: true,
    },
  });
}

export async function viewUnAllocatedComplaints(): Promise<Complaint[]> {
  return await prisma.complaint.findMany({
    where: { institutionId: null },
    include: {
      complainer: true,
      investigation: true,
    },
  });
}
