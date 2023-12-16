import { Prisma, PrismaClient, Complaint } from "@prisma/client"
const prisma = new PrismaClient()

export default async function reportComplaint(
  complaintTitle: string,
  complaintDescription: string,
  complainerId: string
): Promise<Complaint> {
  try {
    const complaint: Complaint = await prisma.complaint.create({
      data: {
        complaint_title: complaintTitle,
        complaint_description: complaintDescription,
        complainer: { connect: { id: complainerId } }
      }
    })
    if (!complaint) throw new Error(`Institution not created`)
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