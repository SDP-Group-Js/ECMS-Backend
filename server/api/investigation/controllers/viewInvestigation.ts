import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInvestigations(investigationId: string) {
  if (!investigationId)
    throw new Error(`Investigation with id ${investigationId} not found`)
  //Change institution to investigation
  return prisma.institution.findUnique({ where: { id: investigationId } })
}
