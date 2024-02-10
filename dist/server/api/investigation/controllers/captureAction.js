"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function captureAction(investigationStageId, actionName, actionDescription, actionUserId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const action = yield prisma.action.create({
                data: {
                    investigationStage: { connect: { id: investigationStageId } },
                    name: actionName,
                    description: actionDescription,
                    user: { connect: { id: actionUserId } },
                },
            });
            if (!action)
                throw new Error(`Action not created`);
            return action;
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
exports.default = captureAction;
