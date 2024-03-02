import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

enum OfficeType {
  Institution = "Institution",
  Division = "Division",
  Branch = "Branch",
  BeatOffice = "BeatOffice"
}

interface OfficeData {
  officeName: string
  officeDescription: string
  officeType: OfficeType
  parentOfficeId: string | null | undefined
}

export default async function createOffice({
  officeName,
  officeDescription,
  officeType,
  parentOfficeId
}: OfficeData): Promise<Office> {
  try {
    let office: Office | null
    if (officeType == OfficeType.Institution) {
      office = await prisma.office.create({
        data: {
          name: officeName,
          description: officeDescription,
          Institution: { create: {} }
        }
      })
      if (!office) throw new Error(`Institution not created`)
    } else {
      if (!parentOfficeId) throw new Error(`Parent Office Id cannot be empty`)
      if (officeType == OfficeType.Division) {
        office = await prisma.office.create({
          data: {
            name: officeName,
            description: officeDescription,
            Division: {
              create: { Institution: { connect: { id: parentOfficeId } } }
            }
          }
        })
        if (!office) throw new Error(`Division not created`)
      } else if (officeType == OfficeType.Branch) {
        office = await prisma.office.create({
          data: {
            name: officeName,
            description: officeDescription,
            Branch: {
              create: { Division: { connect: { id: parentOfficeId } } }
            }
          }
        })
        if (!office) throw new Error(`Branch not created`)
      } else if (officeType == OfficeType.BeatOffice) {
        office = await prisma.office.create({
          data: {
            name: officeName,
            description: officeDescription,
            BeatOffice: {
              create: { Branch: { connect: { id: parentOfficeId } } }
            }
          }
        })
        if (!office) throw new Error(`Beat Office not created`)
      } else {
        office = null
      }
    }
    if (!office) throw new Error(`Office not created`)
    return office
  } catch (error: any) {
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
