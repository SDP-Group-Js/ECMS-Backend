import { Prisma, PrismaClient, Complaint } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewComplaint(
  complaintId: number
): Promise<Complaint> {
  const complaint = await prisma.complaint.findUnique({
    where: { id: complaintId }
  })
  if (!complaint) throw new Error(`Complaint with Id ${complaintId} not found`)
  return complaint
}
