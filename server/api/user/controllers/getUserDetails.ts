import { Prisma, PrismaClient, User, PublicUser } from "@prisma/client"

const prisma = new PrismaClient()

export async function getPublicUser(userId: string): Promise<PublicUser> {
  try {
    const publicUser: PublicUser | null = await prisma.publicUser.findUnique({
      where: { id: userId }
    })
    if (!publicUser) throw new Error(`User not found`)
    return publicUser
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

export async function getUser(userId: string): Promise<User> {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { id: userId },
      include: { office: { include: { assignedInvestigations: true } } }
    })
    if (!user) throw new Error(`User not found`)
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
