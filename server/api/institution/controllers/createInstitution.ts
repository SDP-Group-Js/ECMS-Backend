import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

export default async function createInstitution(
  institutionName: string,
  institutionDescription: string
): Promise<Office> {
  try {
    const office: Office = await prisma.office.create({
      data: {
        name: institutionName,
        description: institutionDescription,
        Institution: { create: {} }
      }
    })
    if (!office) throw new Error(`Institution not created`)
    return office
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
