// Seed data using Prisma

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedData() {
  try {
    // Create Institutions
    const institutionsData = [
      { name: 'Wildlife Rescue Center' },
      { name: 'Environmental Protection Agency' },
      { name: 'Animal Conservation Society' },
    ];

    const institutions = [];
    for (const data of institutionsData) {
      const result = await prisma.institution.create({
        data,
      });
      institutions.push(result);
    }

    // Create Divisions
    const divisionsData = [
      { name: 'Rescue Operations', institution: { connect: { id: institutions[0].id } } },
      { name: 'Habitat Preservation', institution: { connect: { id: institutions[0].id } } },
      { name: 'Environmental Compliance', institution: { connect: { id: institutions[1].id } } },
      { name: 'Species Conservation', institution: { connect: { id: institutions[2].id } } },
      { name: 'Public Awareness', institution: { connect: { id: institutions[2].id } } },
    ];

    const divisions = [];
    for (const data of divisionsData) {
      const result = await prisma.division.create({
        data,
      });
      divisions.push(result);
    }

    // Create Offices
    const officesData = [
      { name: 'Field Operations', division: { connect: { id: divisions[0].id } } },
      { name: 'Research and Development', division: { connect: { id: divisions[1].id } } },
      { name: 'Regulatory Compliance', division: { connect: { id: divisions[2].id } } },
      { name: 'Community Engagement', division: { connect: { id: divisions[4].id } } },
    ];

    const offices = [];
    for (const data of officesData) {
      const result = await prisma.office.create({
        data,
      });
      offices.push(result);
    }

    // Create Users
    const usersData = [
      { id: "23525234", name: 'John Doe', division: { connect: { id: divisions[0].id } }, institution: { connect: { id: institutions[0].id } } },
      { id: "23523523234423", name: 'Jane Smith', division: { connect: { id: divisions[1].id } }, institution: { connect: { id: institutions[0].id } } },
      { id: "sadfj02f3fw", name: 'Bob Johnson', division: { connect: { id: divisions[2].id } }, institution: { connect: { id: institutions[1].id } } },
      { id: "dsau0f92u2", name: 'Alice Williams', division: { connect: { id: divisions[3].id } }, institution: { connect: { id: institutions[2].id } } },
    ];

    const users = [];
    for (const data of usersData) {
      const result = await prisma.user.create({
        data,
      });
      users.push(result);
    }

    // Create Public Users
    const publicUsersData = [
      { id: "dsaf23fwsd", nic: 'NIC001', name: 'Public User 1', phone: '1234567890' },
      { id: "sdfag23542", nic: 'NIC002', name: 'Public User 2', phone: '9876543210' },
    ];

    const publicUsers = [];
    for (const data of publicUsersData) {
      const result = await prisma.publicUser.create({
        data,
      });
      publicUsers.push(result);
    }

    // Create Complaints
    const complaintsData = [
      { complaint_title: 'Injured Wildlife', complaint_description: 'Found an injured bird near the park.', complainer: { connect: { id: publicUsers[0].id } }, assignedInstitution: { connect: { id: institutions[0].id } } },
      { complaint_title: 'Illegal Poaching', complaint_description: 'Witnessed illegal hunting activity in the forest.', complainer: { connect: { id: publicUsers[1].id } }, assignedInstitution: { connect: { id: institutions[1].id } } },
    ];

    const complaints = [];
    for (const data of complaintsData) {
      const result = await prisma.complaint.create({
        data,
      });
      complaints.push(result);
    }

    // Create Workflows
    const workflowsData = [
      { institution: { connect: { id: institutions[0].id } }, stages: ['Incident Report Intake', 'Preliminary Assessment', 'On-Site Investigation'] },
      { institution: { connect: { id: institutions[1].id } }, stages: ['Incident Report Intake', 'Coordinating with Law Enforcement', 'Legal Proceedings'] },
    ];

    const workflows = [];
    for (const data of workflowsData) {
      const result = await prisma.workflow.create({
        data,
      });
      workflows.push(result);
    }

    // Create Investigations
    const investigationsData = [
      { institution: { connect: { id: institutions[0].id } }, workflow: { connect: { id: workflows[0].id } }, complaint: { connect: { id: complaints[0].id } }, office: { connect: { id: offices[0].id } }, division: { connect: { id: divisions[0].id } } },
      { institution: { connect: { id: institutions[1].id } }, workflow: { connect: { id: workflows[1].id } }, complaint: { connect: { id: complaints[1].id } }, office: { connect: { id: offices[2].id } }, division: { connect: { id: divisions[2].id } } },
    ];

    const investigations = [];
    for (const data of investigationsData) {
      const result = await prisma.investigation.create({
        data,
      });
      investigations.push(result);
    }

    // Create Investigation Stages
    const investigationStagesData = [
      { stageName: 'Initial Assessment', investigation: { connect: { id: investigations[0].id } } },
      { stageName: 'Evidence Collection', investigation: { connect: { id: investigations[0].id } } },
      { stageName: 'Legal Review', investigation: { connect: { id: investigations[1].id } } },
    ];

    const investigationStages = [];
    for (const data of investigationStagesData) {
      const result = await prisma.investigationStage.create({
        data,
      });
      investigationStages.push(result);
    }

    // Create Actions
    const actionsData = [
      { name: 'Assess severity', investigationStage: { connect: { id: investigationStages[0].id } } },
      { name: 'Interview witnesses', investigationStage: { connect: { id: investigationStages[0].id } } },
      { name: 'Collect samples', investigationStage: { connect: { id: investigationStages[1].id } } },
      { name: 'Review evidence', investigationStage: { connect: { id: investigationStages[1].id } } },
      { name: 'Legal consultation', investigationStage: { connect: { id: investigationStages[2].id } } },
    ];

    const actions = [];
    for (const data of actionsData) {
      const result = await prisma.action.create({
        data,
      });
      actions.push(result);
    }

    console.log('Dummy data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
