import { Prisma, PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInvestigations() {
  //Change institution to investigation
  return prisma.institution.findMany()
}
