"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
var OfficeType;
(function (OfficeType) {
    OfficeType["Institution"] = "Institution";
    OfficeType["Division"] = "Division";
    OfficeType["Branch"] = "Branch";
    OfficeType["BeatOffice"] = "BeatOffice";
})(OfficeType || (OfficeType = {}));
function createOffice({ officeName, officeDescription, officeType, parentOfficeId }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let office;
            if (officeType == OfficeType.Institution) {
                office = yield yield prisma.office.create({
                    data: {
                        name: officeName,
                        description: officeDescription,
                        Institution: { create: {} },
                    },
                });
                if (!office)
                    throw new Error(`Institution not created`);
            }
            else {
                if (!parentOfficeId)
                    throw new Error(`Parent Office Id cannot be empty`);
                if (officeType == OfficeType.Division) {
                    office = yield prisma.office.create({
                        data: {
                            name: officeName,
                            description: officeDescription,
                            Division: {
                                create: { Institution: { connect: { id: parentOfficeId } } },
                            },
                        },
                    });
                    if (!office)
                        throw new Error(`Division not created`);
                }
                else if (officeType == OfficeType.Branch) {
                    office = yield yield prisma.office.create({
                        data: {
                            name: officeName,
                            description: officeDescription,
                            Branch: {
                                create: { Division: { connect: { id: parentOfficeId } } },
                            },
                        },
                    });
                    if (!office)
                        throw new Error(`Branch not created`);
                }
                else if (officeType == OfficeType.BeatOffice) {
                    office = yield prisma.office.create({
                        data: {
                            name: officeName,
                            description: officeDescription,
                            BeatOffice: {
                                create: { Branch: { connect: { id: parentOfficeId } } },
                            },
                        },
                    });
                    if (!office)
                        throw new Error(`Beat Office not created`);
                }
                else {
                    office = null;
                }
            }
            if (!office)
                throw new Error(`Office not created`);
            return office;
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
exports.default = createOffice;
