import { Prisma, PrismaClient, Institution } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInstitution(institutionId: string) {
  const institution : Institution = await prisma.institution.find({where: {id: institutionId}})
  if(!institution) throw new Error(`Institution with institution Id ${institutionId} was not found`);
  return institution
}

export async function viewInstitutions(): Promise<Institution[]> {
  return await prisma.institution.findMany()
}
