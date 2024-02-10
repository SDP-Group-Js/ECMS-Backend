"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function addInvolvedParties(investigationId, officeIds) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const investigation = yield prisma.investigation.update({
                where: { id: investigationId },
                data: { involvedParties: { connect: officeIds.map((id) => ({ id })) } },
            });
            if (!investigation) {
                throw new Error(`Failed to add involved parties to investigation with Id ${investigationId}.`);
            }
            return true;
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
exports.default = addInvolvedParties;
