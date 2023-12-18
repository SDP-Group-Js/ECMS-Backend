import { Prisma, PrismaClient, Office } from "@prisma/client"
import createInstitution from "./createInstitution"
import createDivision from "./createDivision"
import createBranch from "./createBranch"
import createBeatOffice from "./createBeatOffice"
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
      office = await createInstitution(officeName, officeDescription)
    } else {
      if (!parentOfficeId) throw new Error(`Parent Office Id cannot be empty`)
      if (officeType == OfficeType.Division) {
        office = await createDivision(
          officeName,
          officeDescription,
          parentOfficeId
        )
      } else if (officeType == OfficeType.Branch) {
        office = await createBranch(
          officeName,
          officeDescription,
          parentOfficeId
        )
      } else if (officeType == OfficeType.BeatOffice) {
        office = await createBeatOffice(
          officeName,
          officeDescription,
          parentOfficeId
        )
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
