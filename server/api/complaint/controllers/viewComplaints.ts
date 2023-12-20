import { Prisma, PrismaClient, Complaint } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewComplaints(): Promise<Complaint[]> {
  return await prisma.complaint.findMany()
}

export async function viewComplaintsOfUser(
  userId: string
): Promise<Complaint[]> {
  return await prisma.complaint.findMany({
    include: {
      investigation: {
        include: {
          investigationStages: {
            include: { actions: { include: { user: true } } }
          }
        }
      },
      complainer: true
    }
  })
}
