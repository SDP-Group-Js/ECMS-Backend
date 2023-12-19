import { Prisma, PrismaClient, User } from "@prisma/client"

const prisma = new PrismaClient()

enum UserRole {
  SystemAdmin = "SystemAdmin",
  OfficeAdmin = "OfficeAdmin",
  ComplaintHandler = "ComplaintHandler",
  InvestigationHandler = "InvestigationHandler",
  Viewer = "Viewer",
  FieldOfficer = "FieldOfficer"
}

export default async function createUser(
  userId: string,
  userName: string,
  userOfficeId: string,
  userRole: UserRole
): Promise<User> {
  try {
    const user: User = await prisma.user.create({
      data: {
        id: userId,
        name: userName,
        office: { connect: { id: userOfficeId } },
        userRole: userRole
      }
    })
    if (!user) throw new Error(`User not created`)
    return user
  } catch (error) {
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
