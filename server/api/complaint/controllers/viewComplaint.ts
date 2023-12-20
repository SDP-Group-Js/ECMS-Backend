import { Prisma, PrismaClient, Complaint } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewComplaint(
  complaintId: number
): Promise<Complaint> {
  const complaint = await prisma.complaint.findUnique({
    where: { id: complaintId },
    include: {
      investigation: {
        include: {
          investigationStages: {
            include: { actions: { include: { user: true } } }
          }
        }
      }
    }
  })
  if (!complaint) throw new Error(`Complaint with Id ${complaintId} not found`)
  return complaint
}
