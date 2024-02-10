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
function updateOffice({ officeId, officeName, officeDescription, officeType }) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            let office;
            if (officeType == OfficeType.Institution) {
                office = yield prisma.office.update({
                    where: { id: officeId },
                    data: {
                        name: officeName,
                        description: officeDescription,
                    },
                });
            }
            else {
                if (officeType == OfficeType.Division) {
                    office = yield prisma.office.update({
                        where: { id: officeId },
                        data: {
                            name: officeName,
                            description: officeDescription,
                        },
                    });
                }
                else if (officeType == OfficeType.Branch) {
                    office = yield prisma.office.update({
                        where: { id: officeId },
                        data: {
                            name: officeName,
                            description: officeDescription,
                        },
                    });
                }
                else if (officeType == OfficeType.BeatOffice) {
                    office = yield prisma.office.update({
                        where: { id: officeId },
                        data: {
                            name: officeName,
                            description: officeDescription,
                        },
                    });
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
exports.default = updateOffice;
function getOfficeInstitutionId(officeId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const office = yield prisma.office.findUnique({
                where: { id: officeId },
                select: { Institution: { select: { id: true } } },
            });
            if (!office)
                throw new Error(`Office with ID ${officeId} not found.`);
            const institutionId = ((_a = office.Institution) === null || _a === void 0 ? void 0 : _a.id) || null;
            if (!institutionId)
                throw new Error(`Institution ID not found for office with ID ${officeId}.`);
            return institutionId;
        }
        catch (error) {
            console.error('Error retrieving office institution ID:', error.message);
            throw error;
        }
    });
}
function getOfficeDivisionId(officeId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const office = yield prisma.office.findUnique({
                where: { id: officeId },
                select: { Division: { select: { id: true } } },
            });
            if (!office)
                throw new Error(`Office with ID ${officeId} not found.`);
            const DivisionId = ((_a = office.Division) === null || _a === void 0 ? void 0 : _a.id) || null;
            if (!DivisionId)
                throw new Error(`Institution ID not found for office with ID ${officeId}.`);
            return DivisionId;
        }
        catch (error) {
            console.error('Error retrieving office institution ID:', error.message);
            throw error;
        }
    });
}
function getOfficeBranchId(officeId) {
    var _a;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const office = yield prisma.office.findUnique({
                where: { id: officeId },
                select: { Branch: { select: { id: true } } },
            });
            if (!office)
                throw new Error(`Office with ID ${officeId} not found.`);
            const BranchId = ((_a = office.Branch) === null || _a === void 0 ? void 0 : _a.id) || null;
            if (!BranchId)
                throw new Error(`Institution ID not found for office with ID ${officeId}.`);
            return BranchId;
        }
        catch (error) {
            console.error('Error retrieving office institution ID:', error.message);
            throw error;
        }
    });
}
