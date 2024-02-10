import { Prisma, PrismaClient, PublicUser, User } from '@prisma/client';

const prisma = new PrismaClient();

enum UserRole {
  SystemAdmin = 'SystemAdmin',
  OfficeAdmin = 'OfficeAdmin',
  ComplaintHandler = 'ComplaintHandler',
  InvestigationHandler = 'InvestigationHandler',
  Viewer = 'Viewer',
  FieldOfficer = 'FieldOfficer',
}

export async function updatePublicUser(userId: string, userNIC: string, userName: string, userPhone: string): Promise<PublicUser> {
  try {
    const publicUser: PublicUser = await prisma.publicUser.update({
      where: { id: userId },
      data: { nic: userNIC, name: userName, phone: userPhone },
    });
    if (!publicUser) throw new Error(`Public User with Id ${userId} not updated`);
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

export async function updateUser(userId: string, userName: string, userOfficeId: string, userRole: UserRole): Promise<User> {
  try {
    const user: User = await prisma.user.update({
      where: { id: userId },
      data: {
        name: userName,
        office: { connect: { id: userOfficeId } },
        userRole: userRole,
      },
    });
    if (!user) throw new Error(`Public User with Id ${userId} not updated`);
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
