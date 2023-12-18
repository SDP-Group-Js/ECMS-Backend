import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

export default async function createBeatOffice(
  beatOfficeName: string,
  beatOfficeDescription: string,
  parentOfficeId: string
): Promise<Office> {
  try {
    const parentBranchId = await getOfficeBranchId(parentOfficeId)
    const office: Office = await prisma.office.create({
      data: {
        name: beatOfficeName,
        description: beatOfficeDescription,
        BeatOffice: { create: { Branch: { connect: { id: parentBranchId } } } }
      }
    })
    if (!office) throw new Error(`Beat Office not created`)
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

async function getOfficeBranchId(officeId: string): Promise<string> {
  try {
    const office = await prisma.office.findUnique({
      where: { id: officeId },
      select: { Branch: { select: { id: true } } }
    })
    if (!office) throw new Error(`Office with ID ${officeId} not found.`)
    const BranchId = office.Branch?.id || null
    if (!BranchId)
      throw new Error(
        `Institution ID not found for office with ID ${officeId}.`
      )
    return BranchId
  } catch (error: any) {
    console.error("Error retrieving office institution ID:", error.message)
    throw error
  }
}
