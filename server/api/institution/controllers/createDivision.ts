import { Prisma, PrismaClient, Office, Institution } from "@prisma/client"
const prisma = new PrismaClient()

export default async function createDivision(
  divisionName: string,
  divisionDescription: string,
  parentOfficeId: string
): Promise<Office> {
  try {
    const parentInstitutionId = await getOfficeInstitutionId(parentOfficeId)
    const office: Office = await prisma.office.create({
      data: {
        name: divisionName,
        description: divisionDescription,
        Division: {
          create: { Institution: { connect: { id: parentInstitutionId } } }
        }
      }
    })
    if (!office) throw new Error(`Division not created`)
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

async function getOfficeInstitutionId(officeId: string): Promise<string> {
  try {
    const office = await prisma.office.findUnique({
      where: { id: officeId },
      select: { Institution: { select: { id: true } } }
    })
    if (!office) throw new Error(`Office with ID ${officeId} not found.`)
    const institutionId = office.Institution?.id || null
    if (!institutionId)
      throw new Error(
        `Institution ID not found for office with ID ${officeId}.`
      )
    return institutionId
  } catch (error: any) {
    console.error("Error retrieving office institution ID:", error.message)
    throw error
  }
}
