import { Prisma, PrismaClient, User, PublicUser } from "@prisma/client"

const prisma = new PrismaClient()

export async function getPublicUsers(): Promise<PublicUser[]> {
  try {
    const publicUsers: PublicUser[] = await prisma.publicUser.findMany({include: {complaints: true}})
    return publicUsers
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

export async function getUsers(): Promise<User[]> {
  try {
    const users: User[] = await prisma.user.findMany({include: {office: true}})
    return users
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
