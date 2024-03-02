import { PrismaClient, PublicUser } from '@prisma/client';

const prisma = new PrismaClient();

export default async function publicUserExists(userNIC: string): Promise<boolean> {
  const publicUser: PublicUser | null = await prisma.publicUser.findUnique({
    where: { nic: userNIC },
  });
  if (publicUser) return true;
  return false;
}
