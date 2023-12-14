import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInvestigations(investigationId: number) {
  if (!investigationId)
    throw new Error(`Investigation with id ${investigationId} not found`)
  return prisma.investigation.findUnique({ where: { id: investigationId } })
}
