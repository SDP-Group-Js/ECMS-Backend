import {
  Prisma,
  PrismaClient,
  Institution,
  Investigation
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
  //Check if the institution already exists
  const institution = await prisma.institution.findUnique({
    where: { id: institutionId }
  })
  if (!institution)
    throw new Error(`Institution with id ${institutionId} not found`)

  //Check if the complaint already exists
  const complaint = await prisma.complaint.findUnique({
    where: { id: complaintId }
  })
  if (!complaint) throw new Error(`Complaint with id ${complaintId} not found`)

  console.log(institutionId, complaintId)

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

  return investigation
}
