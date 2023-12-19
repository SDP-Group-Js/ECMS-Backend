import { Investigation, Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInvestigation(
  investigationId: number
): Promise<Investigation> {
  try {
    const investigation: Investigation | null =
      await prisma.investigation.findUnique({
        where: { id: investigationId }
      })
    if (!investigation) throw new Error(`User not found`)
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
