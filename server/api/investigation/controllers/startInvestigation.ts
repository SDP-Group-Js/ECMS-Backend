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
      //Check for null errors
      if (!institutionId) throw new Error(`Institution Id cannot be Empty`)
      if (!complaintId) throw new Error(`Complaint Id cannot be Empty`)

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
      if (!complaint)
        throw new Error(`Complaint with id ${complaintId} not found`)

      //Check if the investigation already exists
      const existingInvestigation = await prisma.investigation.findUnique({
        where: { complaintId: complaintId }
      })
      if (existingInvestigation) throw new Error(`Investigation already exists`)

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

      //Get the Id of the new investigation
      const investigationId: number = investigation.id

      //Update Complaint
      const updatedComplaint: Complaint = await prisma.complaint.update({
        where: {
          id: complaintId
        },
        data: {
          investigation: {
            connect: {
              id: investigationId
            }
          }
        }
      })
      if (!updatedComplaint) throw new Error(`Complaint not updated`)

      //Update Institution
      const updatedInstitution: Institution = await prisma.institution.update({
        where: {
          id: institutionId
        },
        data: {
          investigations: {
            connect: {
              id: investigationId
            }
          }
        }
      })
      if (!updatedInstitution) throw new Error(`Institution not updated`)

      return investigation
    })
  } catch (error: any) {
    throw new Error(`Transaction failed: ${error.message}`)
  }
}
