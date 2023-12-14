import { Investigation, Prisma, PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const fetchUpdatedInvestigation = async (
  investigationId: number
): Promise<Investigation | null> => {
  return prisma.investigation.findUnique({
    where: { id: investigationId }
  })
}

const handleTransactionError = (message: string) => {
  console.error(message)
  throw new Error(message)
}

export async function allocateInvestigationToInstitutions(
  investigationId: number,
  institutionIds: string[]
): Promise<Investigation> {
  try {
    await Promise.all(
      institutionIds.map(async (institutionId) => {
        const investigation = await prisma.investigation.update({
          where: { id: investigationId },
          data: { institution: { connect: { id: institutionId } } }
        })
        if (!investigation) {
          handleTransactionError(
            `Error allocating Institution Id: ${institutionId} to Investigation Id: ${investigationId}`
          )
        }
      })
    )

    const updatedInvestigation = await fetchUpdatedInvestigation(
      investigationId
    )
    if (!updatedInvestigation) {
      handleTransactionError("Error fetching the updated investigation")
    }

    return updatedInvestigation as Investigation
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log(
        "There is a unique constraint violation, a new investigation cannot be created with this email"
      )
    }
    throw error
  }
}

export async function allocateInvestigationToDivision(
  investigationId: number,
  divisionId: string
): Promise<Investigation> {
  try {
    const investigation = await prisma.investigation.update({
      where: { id: investigationId },
      data: {
        //divisionId: divisionId,
        division: { connect: { id: divisionId } } as any
      }
    })
    if (!investigation) {
      handleTransactionError(
        `There was an error allocating division with ${divisionId} to the investigation with ${investigationId}, the operation did not proceed`
      )
    }

    const updatedInvestigation = await fetchUpdatedInvestigation(
      investigationId
    )
    if (!updatedInvestigation) {
      handleTransactionError("Error fetching the updated investigation")
    }
    return updatedInvestigation as Investigation
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log(
        "There is a unique constraint violation, a new investigation cannot be created with this email"
      )
    }
    throw error
  }
}

export async function allocateInvestigationToOffice(
  investigationId: number,
  officeId: string
): Promise<Investigation> {
  try {
    const investigation = await prisma.investigation.update({
      where: { id: investigationId },
      data: {
        //officeId: officeId,
        office: { connect: { id: officeId } } as any
      }
    })
    if (!investigation) {
      handleTransactionError(
        `There was an error allocating office with ${officeId} to the investigation with ${investigationId}, the operation did not proceed`
      )
    }

    const updatedInvestigation = await fetchUpdatedInvestigation(
      investigationId
    )
    if (!updatedInvestigation) {
      handleTransactionError("Error fetching the updated investigation")
    }

    return updatedInvestigation as Investigation
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log(
        "There is a unique constraint violation, a new investigation cannot be created with this email"
      )
    }
    throw error
  }
}

export default async function allocateInvestigation(
  investigationId: number,
  institutionIds: string[],
  divisionId: string,
  officeId: string
): Promise<Investigation> {
  try {
    await Promise.all(
      institutionIds.map(async (institutionId) => {
        const instituteUpdateResult = await prisma.investigation.update({
          where: { id: investigationId },
          data: { institution: { connect: { id: institutionId } } }
        })
        if (!instituteUpdateResult) {
          handleTransactionError(
            `Error allocating Institution Id: ${institutionId} to Investigation Id: ${investigationId}`
          )
        }
      })
    )

    await prisma.investigation.update({
      where: { id: investigationId },
      data: {
        //divisionId: divisionId,
        division: { connect: { id: divisionId } } as any
      }
    })

    await prisma.investigation.update({
      where: { id: investigationId },
      data: {
        //officeId: officeId,
        office: { connect: { id: officeId } } as any
      }
    })

    const updatedInvestigation = await fetchUpdatedInvestigation(
      investigationId
    )
    if (!updatedInvestigation) {
      handleTransactionError("Error fetching the updated investigation")
    }

    return updatedInvestigation as Investigation
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      console.log(
        "There is a unique constraint violation, a new investigation cannot be created with this email"
      )
    }
    throw error
  }
}
