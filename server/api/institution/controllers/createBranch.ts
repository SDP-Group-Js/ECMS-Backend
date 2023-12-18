import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

export default async function createBranch(
  branchName: string,
  branchDescription: string,
  parentOfficeId: string
): Promise<Office> {
  try {
    const parentDivisionId = await getOfficeDivisionId(parentOfficeId)
    const office: Office = await prisma.office.create({
      data: {
        name: branchName,
        description: branchDescription,
        Branch: { create: { Division: { connect: { id: parentDivisionId } } } }
      }
    })
    if (!office) throw new Error(`Branch not created`)
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

async function getOfficeDivisionId(officeId: string): Promise<string> {
  try {
    const office = await prisma.office.findUnique({
      where: { id: officeId },
      select: { Division: { select: { id: true } } }
    })
    if (!office) throw new Error(`Office with ID ${officeId} not found.`)
    const DivisionId = office.Division?.id || null
    if (!DivisionId)
      throw new Error(
        `Institution ID not found for office with ID ${officeId}.`
      )
    return DivisionId
  } catch (error: any) {
    console.error("Error retrieving office institution ID:", error.message)
    throw error
  }
}
