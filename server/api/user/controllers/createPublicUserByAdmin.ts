import { Prisma, PrismaClient, PublicUser } from '@prisma/client';
import admin from 'firebase-admin';

const prisma = new PrismaClient();

export default async function createUser(
  userEmail: string,
  userPassword: string,
  userNIC: string,
  userName: string,
  userPhone: string,
): Promise<PublicUser> {
  try {
    // Create a new user using Firebase Admin SDK
    const authUser = await admin.auth().createUser({
      email: userEmail,
      password: userPassword,
    });

    // Use the Firebase-generated UID as the userId
    const userId = authUser.uid;

    // Create a user record in your MySQL database
    const user: PublicUser = await prisma.publicUser.create({
      data: {
        id: userId,
        nic: userNIC,
        name: userName,
        phone: userPhone,
      },
    });

    if (!user) throw new Error(`User not created`);
    return user;
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
