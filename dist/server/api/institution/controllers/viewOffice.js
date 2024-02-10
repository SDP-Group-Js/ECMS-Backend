"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewInstitutions = exports.viewOffices = exports.viewOffice = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function viewOffice(officeId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const office = yield prisma.office.findUnique({
            where: { id: officeId },
        });
        if (!office)
            throw new Error(`Office with office Id ${officeId} was not found.`);
        return office;
    });
}
exports.viewOffice = viewOffice;
function viewOffices() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield prisma.office.findMany({
            include: {
                Institution: true,
                Division: { include: { Institution: { include: { office: true } } } },
                Branch: { include: { Division: { include: { office: true } } } },
                BeatOffice: { include: { Branch: { include: { office: true } } } },
            },
        });
    });
}
exports.viewOffices = viewOffices;
function viewInstitutions() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield prisma.office.findMany({
            where: { Institution: { NOT: undefined } },
            include: {
                Institution: true,
            },
        });
    });
}
exports.viewInstitutions = viewInstitutions;
