import { Investigation, Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function addInvolvedParties(
  investigationId: number,
  officeIds: string[]
): Promise<boolean> {
  try {
    await prisma.$transaction(async (prisma) => {
      const involvedParties = await Promise.all(
        officeIds.map(async (officeId: string) => {
          const investigation: Investigation =
            await prisma.investigation.update({
              where: { id: investigationId },
              data: { involvedParties: { connect: { id: officeId } } }
            })
          if (!investigation) {
            throw new Error(
              `Failed to add involved party with Id: ${officeId}, whole transaction was aborted.`
            )
          }
          return investigation
        })
      )
      if (!involvedParties) return false
    })
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
