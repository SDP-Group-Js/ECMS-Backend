"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = tslib_1.__importDefault(require("../../../../prisma/client"));
function updateInstitutionWorkflow(id, stages, name, description) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const updatedWorkflow = yield client_1.default.workflow.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                description: description,
                stages: stages,
            },
        });
        return updatedWorkflow;
    });
}
exports.default = updateInstitutionWorkflow;
