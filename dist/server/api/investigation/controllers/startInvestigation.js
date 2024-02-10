"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function startInvestigation(investigationDescription, complaintId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const complaint = yield prisma.complaint.findUnique({
                where: { id: complaintId },
                include: { institution: { include: { office: true } } },
            });
            if (!complaint)
                throw new Error(`Complaint with id ${complaintId} not found`);
            const officeId = complaint.institution.office.id;
            const investigation = yield prisma.investigation.create({
                data: {
                    description: investigationDescription,
                    complaint: { connect: { id: complaintId } },
                    office: { connect: { id: officeId } },
                },
            });
            if (!investigation)
                throw new Error(`Investigation not created`);
            return investigation;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    console.error('Unique constraint violation:', error.message);
                }
                else if (error.code === 'P2022') {
                    console.error('Record not found:', error.message);
                }
                else {
                    console.error('Prisma Client Known Request Error:', error.message);
                }
            }
            throw error;
        }
    });
}
exports.default = startInvestigation;
