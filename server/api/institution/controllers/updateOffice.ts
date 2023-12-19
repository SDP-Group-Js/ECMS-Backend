import { Prisma, PrismaClient, Office } from "@prisma/client"
const prisma = new PrismaClient()

enum officeType { "Division" , "Branch" , "BeatOffice" }

export default async function updateOffice(
  officeId: string,
  officeName: string,
  officeDescription: string,
  officeType: officeType, 
  institutionId: string,
  parentOfficeId: string | null,

): Promise<Office> {
  try {
    let office : Office;
    if(parentOfficeId){
        office = await prisma.institution.update({
            where:{id: officeId},
            data: {
              name: officeName,
              description: officeDescription,
              type: officeType,
              institution: {connect: {id: institutionId}},
              office: {connect: {id: parentOfficeId}}
            }
        })
    }else{
        office = await prisma.institution.update({
            where: {id: officeId},
            data: {
              name: officeName,
              description: officeDescription,
              type: officeType,
              institution: {connect: {id: institutionId}}
            }
        })
    }
    if (!office) throw new Error(`Institution not created`)
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
