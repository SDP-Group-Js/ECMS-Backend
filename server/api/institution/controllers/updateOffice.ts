import { Office, Prisma, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

enum OfficeType {
  Institution = 'Institution',
  Division = 'Division',
  Branch = 'Branch',
  BeatOffice = 'BeatOffice',
}

interface OfficeData {
  officeId: string;
  officeName: string;
  officeDescription: string;
  officeType: OfficeType;
}

export default async function updateOffice({ officeId, officeName, officeDescription, officeType }: OfficeData): Promise<Office> {
  try {
    let office: Office | null;
    if (officeType == OfficeType.Institution) {
      office = await prisma.office.update({
        where: { id: officeId },
        data: {
          name: officeName,
          description: officeDescription,
        },
      });
    } else {
      if (officeType == OfficeType.Division) {
        office = await prisma.office.update({
          where: { id: officeId },
          data: {
            name: officeName,
            description: officeDescription,
          },
        });
      } else if (officeType == OfficeType.Branch) {
        office = await prisma.office.update({
          where: { id: officeId },
          data: {
            name: officeName,
            description: officeDescription,
          },
        });
      } else if (officeType == OfficeType.BeatOffice) {
        office = await prisma.office.update({
          where: { id: officeId },
          data: {
            name: officeName,
            description: officeDescription,
          },
        });
      } else {
        office = null;
      }
    }
    if (!office) throw new Error(`Office not created`);
    return office;
  } catch (error: any) {
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

async function getOfficeInstitutionId(officeId: string): Promise<string> {
  try {
    const office = await prisma.office.findUnique({
      where: { id: officeId },
      select: { Institution: { select: { id: true } } },
    });
    if (!office) throw new Error(`Office with ID ${officeId} not found.`);
    const institutionId = office.Institution?.id || null;
    if (!institutionId) throw new Error(`Institution ID not found for office with ID ${officeId}.`);
    return institutionId;
  } catch (error: any) {
    console.error('Error retrieving office institution ID:', error.message);
    throw error;
  }
}

async function getOfficeDivisionId(officeId: string): Promise<string> {
  try {
    const office = await prisma.office.findUnique({
      where: { id: officeId },
      select: { Division: { select: { id: true } } },
    });
    if (!office) throw new Error(`Office with ID ${officeId} not found.`);
    const DivisionId = office.Division?.id || null;
    if (!DivisionId) throw new Error(`Institution ID not found for office with ID ${officeId}.`);
    return DivisionId;
  } catch (error: any) {
    console.error('Error retrieving office institution ID:', error.message);
    throw error;
  }
}

async function getOfficeBranchId(officeId: string): Promise<string> {
  try {
    const office = await prisma.office.findUnique({
      where: { id: officeId },
      select: { Branch: { select: { id: true } } },
    });
    if (!office) throw new Error(`Office with ID ${officeId} not found.`);
    const BranchId = office.Branch?.id || null;
    if (!BranchId) throw new Error(`Institution ID not found for office with ID ${officeId}.`);
    return BranchId;
  } catch (error: any) {
    console.error('Error retrieving office institution ID:', error.message);
    throw error;
  }
}
