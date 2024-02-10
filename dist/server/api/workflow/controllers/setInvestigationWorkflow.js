"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../../../prisma/client"));
function setInvestigationWorkflow(investigationId, institutionWorkflow) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const investigation = yield client_1.default.investigation.findUnique({
                where: {
                    id: investigationId,
                },
            });
            if (investigation) {
                if (investigation.institutionWorkflowId) {
                    throw new Error("Can't change Workflow once it is set");
                }
            }
            const updatedInvestigation = yield client_1.default.investigation.update({
                where: {
                    id: investigationId,
                },
                data: {
                    institutionWorkflow: {
                        connect: {
                            id: institutionWorkflow.id,
                        },
                    },
                    investigationStages: {
                        createMany: {
                            data: [
                                ...institutionWorkflow.stages.map((stage, index) => {
                                    return {
                                        stageName: stage,
                                        order: index + 1,
                                        status: index == 1 ? 'Ongoing' : 'Pending',
                                    };
                                }),
                            ],
                        },
                    },
                },
                include: {
                    investigationStages: {
                        orderBy: {
                            order: 'asc',
                        },
                    },
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
exports.default = setInvestigationWorkflow;
