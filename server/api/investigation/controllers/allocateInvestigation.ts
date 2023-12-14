import { Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function allocateInvestigationToSecondaryInstitutions(
  investigationId: number,
  institutionIds: string[]
) {
  //Check for null errors
  if (!investigationId) throw new Error("Investigation Id cannot be empty")
  if (!institutionIds || institutionIds.length === 0)
    throw new Error("List of Institution Ids cannot be empty")

  //Check if the investigation is available in the database
  const existingInvestigation = await prisma.investigation.findUnique({
    where: { id: investigationId }
  })
  if (!existingInvestigation)
    throw new Error(`Investigation with Id ${investigationId} not found`)

  //Check if all the institution Ids are corresponding institutions available in the database
  const existingInstitutions = await prisma.institution.findMany({
    where: { id: { in: institutionIds } }
  })
  if (existingInstitutions.length !== institutionIds.length)
    throw new Error(
      `Some of the Institution Ids are not corresponding to institutions`
    )

  //Allocate the investigation to the institutions and vice versa
  await Promise.all(
    institutionIds.map(async (institutionId) => {
      await updateInvestigationAndInstitution(investigationId, institutionId)
    })
  )

  return true
}

async function updateInvestigationAndInstitution(
  investigationId: number,
  institutionId: string
) {
  const updatedInvestigation = await prisma.investigation.update({
    where: { id: investigationId },
    data: { institution: { connect: { id: institutionId } } }
  })

  const updatedInstitution = await prisma.institution.update({
    where: { id: institutionId },
    data: { investigations: { connect: { id: investigationId } } }
  })

  if (!updatedInvestigation || !updatedInstitution) {
    throw new Error(
      `Failed to update records for Investigation Id ${investigationId} and Institution Id ${institutionId}`
    )
  }
}
