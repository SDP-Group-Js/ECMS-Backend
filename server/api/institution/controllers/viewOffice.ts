import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

export default async function viewInstitution(officeId: string) {
  const office : Office = await prisma.office.find({where: {id: officeId}})
  if(!office) throw new Error(`Office with office Id ${officeId} was not found.`)
  return office
}

export async function viewInstitutions(): Promise<Office[]> {
  return await prisma.office.findMany()
}
