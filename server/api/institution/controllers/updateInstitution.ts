import { Prisma, PrismaClient, Institution } from "@prisma/client"
const prisma = new PrismaClient()

export default async function updateInstitution(
  institutionId: string,
  institutionName: string
): Promise<Institution> {
  try {
    const institution: Institution = await prisma.institution.update({
      where: {id: institutionId}, 
      data: { name: institutionName }
    })
    if (!institution) throw new Error(`Institution not uppdated`)
    return institution
  } catch (error: any) {
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
