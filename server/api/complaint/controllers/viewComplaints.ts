import { Prisma, PrismaClient, Complaint } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewComplaints(): Promise<Complaint[]> {
  return await prisma.complaint.findMany()
}
