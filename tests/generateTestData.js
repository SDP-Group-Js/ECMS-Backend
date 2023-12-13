// Seed data using Prisma

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  try {
    // Create Institutions
    const institutions = await prisma.institution.createMany({
      data: [
        { name: 'Wildlife Rescue Center' },
        { name: 'Environmental Protection Agency' },
        { name: 'Animal Conservation Society' },
      ],
    });

    console.log(institutions)

    // Create Divisions
    const divisions = await prisma.division.createMany({
      data: [
        { name: 'Rescue Operations', institutionId: institutions[0].id },
        { name: 'Habitat Preservation', institutionId: institutions[0].id },
        { name: 'Environmental Compliance', institutionId: institutions[1].id },
        { name: 'Species Conservation', institutionId: institutions[2].id },
        { name: 'Public Awareness', institutionId: institutions[2].id },
      ],
    });

    console.log(divisions)

    // Create Offices
    const offices = await prisma.office.createMany({
      data: [
        { name: 'Field Operations', divisionId: divisions[0].id },
        { name: 'Research and Development', divisionId: divisions[1].id },
        { name: 'Regulatory Compliance', divisionId: divisions[2].id },
        { name: 'Community Engagement', divisionId: divisions[4].id },
      ],
    });

    console.log(offices)

    // Create Users
    const users = await prisma.user.createMany({
      data: [
        { name: 'John Doe', divisionId: divisions[0].id, institutionId: institutions[0].id },
        { name: 'Jane Smith', divisionId: divisions[1].id, institutionId: institutions[0].id },
        { name: 'Bob Johnson', divisionId: divisions[2].id, institutionId: institutions[1].id },
        { name: 'Alice Williams', divisionId: divisions[3].id, institutionId: institutions[2].id },
      ],
    });

    console.log(users)

    // Create Public Users
    const publicUsers = await prisma.publicUser.createMany({
      data: [
        { nic: 'NIC001', name: 'Public User 1', phone: '1234567890' },
        { nic: 'NIC002', name: 'Public User 2', phone: '9876543210' },
      ],
    });

    console.log(publicUsers)

    // Create Complaints
    const complaints = await prisma.complaint.createMany({
      data: [
        { complaint_title: 'Injured Wildlife', complaint_description: 'Found an injured bird near the park.', complainerId: publicUsers[0].id, assignedInstitutionId: institutions[0].id },
        { complaint_title: 'Illegal Poaching', complaint_description: 'Witnessed illegal hunting activity in the forest.', complainerId: publicUsers[1].id, assignedInstitutionId: institutions[1].id },
      ],
    });

    console.log(complaints)

    // Create Workflows
    const workflows = await prisma.workflow.createMany({
      data: [
        { institutionId: institutions[0].id, stages: ['Incident Report Intake', 'Preliminary Assessment', 'On-Site Investigation'] },
        { institutionId: institutions[1].id, stages: ['Incident Report Intake', 'Coordinating with Law Enforcement', 'Legal Proceedings'] },
      ],
    });

    console.log(workflows)

    // Create Investigations
    const investigations = await prisma.investigation.createMany({
      data: [
        { institutionId: institutions[0].id, workflowId: workflows[0].id, complaintId: complaints[0].id, officeId: offices[0].id, divisionId: divisions[0].id },
        { institutionId: institutions[1].id, workflowId: workflows[1].id, complaintId: complaints[1].id, officeId: offices[2].id, divisionId: divisions[2].id },
      ],
    });

    console.log(investigations)

    // Create Investigation Stages
    const investigationStages = await prisma.investigationStage.createMany({
      data: [
        { stageName: 'Initial Assessment', investigationId: investigations[0].id },
        { stageName: 'Evidence Collection', investigationId: investigations[0].id },
        { stageName: 'Legal Review', investigationId: investigations[1].id },
      ],
    });

    console.log(investigationStages)

    // Create Actions
    const actions = await prisma.action.createMany({
      data: [
        { name: 'Assess severity', investigationStageId: investigationStages[0].id },
        { name: 'Interview witnesses', investigationStageId: investigationStages[0].id },
        { name: 'Collect samples', investigationStageId: investigationStages[1].id },
        { name: 'Review evidence', investigationStageId: investigationStages[1].id },
        { name: 'Legal consultation', investigationStageId: investigationStages[2].id },
      ],
    });

    console.log(actions)

    console.log('Dummy data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();