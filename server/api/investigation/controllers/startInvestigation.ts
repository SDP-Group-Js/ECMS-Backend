import {
  Prisma,
  PrismaClient,
  Institution,
  Investigation,
  Complaint
} from "@prisma/client"

const prisma = new PrismaClient()

/**
 * Starts an investigation for a complaint in a specific institution.
 *
 * @param institutionId - The ID of the institution.
 * @param complaintId - The ID of the complaint.
 * @returns The created investigation.
 * @throws Error if the institution is not found.
 */

export default async function startInvestigation(
  institutionId: string,
  complaintId: number
): Promise<Investigation> {
  try {
    return await prisma.$transaction(async (prisma) => {
      //Create Investigation
      const investigation: Investigation = await prisma.investigation.create({
        data: {
          institutionId: institutionId,
          institution: {
            connect: {
              id: institutionId
            }
          },
          complaintId: complaintId
        }
      })
      if (!investigation) throw new Error(`Investigation not created`)

      return investigation
    })
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        console.log(
          "There is a unique constraint violation, a new investigation cannot be created with this email"
        )
      }
    }
    throw error
  }
}
