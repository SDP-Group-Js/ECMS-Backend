import {
  Prisma,
  PrismaClient,
  Institution,
  Investigation,
  Complaint
} from "@prisma/client"

const prisma = new PrismaClient()

export default async function startInvestigation(
  investigationDescription: string,
  complaintId: number
): Promise<Investigation> {
  try {
    if (await getComplaintHasInvestigationStatus(complaintId))
      throw new Error("Complaint already has an investigation")
    const institutionId: string = await getInstituteIdOfComplaint(complaintId)
    const investigation: Investigation = await prisma.investigation.create({
      data: {
        description: investigationDescription,
        institution: { connect: { id: institutionId } },
        complaint: { connect: { id: complaintId } }
      }
    })
    if (!investigation) throw new Error(`Investigation not created`)
    return investigation
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

async function getInstituteIdOfComplaint(complaintId: number): Promise<string> {
  try {
    const complaint = await prisma.complaint.findUnique({
      where: {
        id: complaintId
      },
      select: {
        assignedInstitutionId: true
      }
    })
    if (!complaint)
      throw new Error(`Complaint with id ${complaintId} not found`)
    if (!complaint.assignedInstitutionId)
      throw new Error(
        `Complaint with id ${complaintId} not assigned to an institution`
      )
    return complaint.assignedInstitutionId
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

async function getComplaintHasInvestigationStatus(
  complaintId: number
): Promise<boolean> {
  try {
    const complaint = await prisma.complaint.findUnique({
      where: { id: complaintId },
      select: {
        investigation: true
      }
    })
    if (!complaint)
      throw new Error(`Complaint with id ${complaintId} not found`)
    if (complaint.investigation) return true
    return false
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
