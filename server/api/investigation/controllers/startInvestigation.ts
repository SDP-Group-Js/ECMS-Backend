import { Prisma, PrismaClient, Investigation } from "@prisma/client"

const prisma = new PrismaClient()

export default async function startInvestigation(
  investigationDescription: string,
  complaintId: number,
  institutionId: string
): Promise<Investigation> {
  try {
    const investigation: Investigation = await prisma.investigation.create({
      data: {
        description: investigationDescription,
        complaint: { connect: { id: complaintId } }
      }
    })
    if (!investigation) throw new Error(`Investigation not created`)
    return investigation
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
