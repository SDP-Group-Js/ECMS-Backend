"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const client_2 = tslib_1.__importDefault(require("../../../../prisma/client"));
function createInstitutionWorkflow(officeId, stages, name, description) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            if (officeId.length > 0) {
                const office = yield client_2.default.office.findUnique({
                    where: {
                        id: officeId,
                    },
                });
                if (office == null)
                    throw new Error('Invalid OfficeId');
                const newWorkflow = yield client_2.default.workflow.create({
                    data: {
                        name: name,
                        description: description,
                        stages: stages,
                        office: {
                            connect: {
                                id: officeId,
                            },
                        },
                    },
                });
                return newWorkflow;
            }
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    console.log('There is a unique constraint violation, a new workflow cannot be created with this email');
                }
            }
            throw error;
        }
    });
}
exports.default = createInstitutionWorkflow;
