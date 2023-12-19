import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

export async function viewOffice(officeId: string): Promise<Office> {
  const office: Office | null = await prisma.office.findUnique({
    where: { id: officeId }
  })
  if (!office)
    throw new Error(`Office with office Id ${officeId} was not found.`)
  return office
}

export async function viewOffices(): Promise<Office[]> {
  return await prisma.office.findMany()
}
