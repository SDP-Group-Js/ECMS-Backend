"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function completeInvestigationStage(investigationStageId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const currentStage = yield prisma.investigationStage.findUnique({
                where: { id: investigationStageId },
                include: {
                    investigation: true,
                },
            });
            if (!currentStage)
                throw new Error('Investigation stage not found');
            yield prisma.investigationStage.update({
                where: { id: investigationStageId },
                data: { status: 'Completed' },
            });
            const nextStage = yield prisma.investigationStage.findFirst({
                where: {
                    investigationId: currentStage.investigationId,
                    order: currentStage.order + 1,
                },
            });
            if (nextStage) {
                yield prisma.investigationStage.update({
                    where: { id: nextStage.id },
                    data: { status: 'Ongoing' },
                });
            }
            else {
                yield prisma.investigation.update({
                    where: { id: currentStage.investigationId },
                    data: { status: 'Completed' },
                });
            }
            return currentStage;
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
exports.default = completeInvestigationStage;
