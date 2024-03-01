import { Prisma, PrismaClient, PublicUser } from '@prisma/client';

const prisma = new PrismaClient();

export default async function registerUser(userId: string, userNIC: string, userName: string, userPhone: string): Promise<PublicUser> {
  try {
    const publicUser: PublicUser = await prisma.publicUser.create({
      data: { id: userId, nic: userNIC, name: userName, phone: userPhone },
    });
    if (!publicUser) throw new Error(`Public User not created`);
    return publicUser;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        console.error('Unique constraint violation:', error.message);
      } else if (error.code === 'P2022') {
        console.error('Record not found:', error.message);
      } else {
        console.error('Prisma Client Known Request Error:', error.message);
      }
    }
    throw error;
  }
}
