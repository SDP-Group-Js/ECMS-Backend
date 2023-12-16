import { Investigation, Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function addInvolvedParties(
  investigationId: number,
  officeIds: string[]
): Promise<boolean> {
  try {
    const investigation: Investigation = await prisma.investigation.update({
      where: { id: investigationId },
      data: { involvedParties: { connect: officeIds.map((id) => ({ id })) } }
    })
    if (!investigation) {
      throw new Error(`Failed to add involved parties.`)
    }
    return true
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
