"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../../../prisma/client"));
function updateInvestigationStage(investigationStageId, description, status, tasks) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const updatedInvestigation = yield client_1.default.investigationStage.update({
                where: {
                    id: investigationStageId,
                },
                data: {
                    description,
                    status,
                    tasks,
                },
            });
            return updatedInvestigation;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    });
}
exports.default = updateInvestigationStage;
