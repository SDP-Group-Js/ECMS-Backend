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

    // Create Divisions
    const divisions = [];
    for (let i = 0; i < institutions.length; i++) {
      const numDivisions = Math.floor(Math.random() * (6 - 5 + 1) + 5);
      for (let j = 1; j <= numDivisions; j++) {
        const division = await prisma.division.create({
          data: { name: `Division ${j}`, institutionId: institutions[i].id },
        });
        divisions.push(division);
      }
    }

    // Create Offices
    const offices = [];
    for (let i = 0; i < divisions.length; i++) {
      const numOffices = Math.floor(Math.random() * (6 - 3 + 1) + 3);
      for (let j = 1; j <= numOffices; j++) {
        const office = await prisma.office.create({
          data: { name: `Office ${j}`, divisionId: divisions[i].id },
        });
        offices.push(office);
      }
    }

    // Create Users (Officers)
    const officers = [];
    for (let i = 0; i < offices.length; i++) {
      const numOfficers = Math.floor(Math.random() * (20 - 10 + 1) + 10);
      for (let j = 1; j <= numOfficers; j++) {
        const officer = await prisma.user.create({
          data: { name: `Officer ${j}`, officeId: offices[i].id },
        });
        officers.push(officer);
      }
    }

    // Create Public Users
    const publicUsers = await prisma.publicUser.createMany({
      data: [
        { nic: 'NIC001', name: 'Public User 1', phone: '1234567890' },
        { nic: 'NIC002', name: 'Public User 2', phone: '9876543210' },
      ],
    });

    // Create Complaints
    const complaints = [];
    for (let i = 0; i < publicUsers.length; i++) {
      const numComplaints = Math.floor(Math.random() * 3) + 1;
      for (let j = 1; j <= numComplaints; j++) {
        const complaint = await prisma.complaint.create({
          data: {
            complaint_title: `Complaint ${j}`,
            complaint_description: `Description for Complaint ${j}`,
            complainerId: publicUsers[i].id,
          },
        });
        complaints.push(complaint);
      }
    }

    // Create Workflows
    const workflows = [];
    for (let i = 0; i < institutions.length; i++) {
      const workflow = await prisma.workflow.create({
        data: {
          institutionId: institutions[i].id,
          stages: JSON.stringify(['Incident Report Intake', 'Preliminary Assessment', 'On-Site Investigation']),
        },
      });
      workflows.push(workflow);
    }

    // Create Investigations
    const investigations = [];
    for (let i = 0; i < complaints.length; i++) {
      const investigation = await prisma.investigation.create({
        data: {
          institutionId: institutions[i % institutions.length].id,
          workflowId: workflows[i % workflows.length].id,
          complaintId: complaints[i].id,
          officeId: offices[i % offices.length].id,
          divisionId: divisions[i % divisions.length].id,
        },
      });
      investigations.push(investigation);
    }

    // Create Investigation Stages
    const investigationStages = [];
    for (let i = 0; i < investigations.length; i++) {
      const numStages = Math.floor(Math.random() * 3) + 1;
      for (let j = 1; j <= numStages; j++) {
        const stage = await prisma.investigationStage.create({
          data: { stageName: `Stage ${j}`, investigationId: investigations[i].id },
        });
        investigationStages.push(stage);
      }
    }

    // Create Actions
    const actions = [];
    for (let i = 0; i < investigationStages.length; i++) {
      const numActions = Math.floor(Math.random() * 3) + 1;
      for (let j = 1; j <= numActions; j++) {
        const action = await prisma.action.create({
          data: {
            name: `Action ${j}`,
            description: `Description for Action ${j}`,
            investigationStageId: investigationStages[i].id,
          },
        });
        actions.push(action);
      }
    }

    console.log('Dummy data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
