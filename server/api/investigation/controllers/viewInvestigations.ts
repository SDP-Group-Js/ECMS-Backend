import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInvestigations() {
  return prisma.investigation.findMany()
}
