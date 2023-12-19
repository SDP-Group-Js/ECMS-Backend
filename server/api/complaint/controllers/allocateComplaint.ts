import { Prisma, PrismaClient, Complaint, Institution } from "@prisma/client"
const prisma = new PrismaClient()

export default async function allocateComplaint(
  complaintId: number,
  institutionId: string
): Promise<Complaint> {
  try {
    const complaint: Complaint = await prisma.complaint.update({
      where: { id: complaintId },
      data: {
        institution: { connect: { id: institutionId } }
      }
    })
    if (!complaint)
      throw new Error(`Complaint with id ${complaintId} not updated`)
    return complaint
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        console.error("Unique constraint violation:", error.message)
      } else if (error.code === "P2022") {
        console.error("Record not found:", error.message)
      } else {
        console.error("Prisma Client Known Request Error:", error.message)
      }
    }
    throw error
  }
}