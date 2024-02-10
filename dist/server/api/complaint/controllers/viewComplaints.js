"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUnAllocatedComplaints = exports.viewComplaintsOfUser = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function viewComplaints() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield prisma.complaint.findMany();
    });
}
exports.default = viewComplaints;
function viewComplaintsOfUser(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield prisma.complaint.findMany({
            where: { complainerId: userId },
            include: {
                investigation: {
                    include: {
                        investigationStages: {
                            include: { actions: { include: { user: true } } },
                        },
                    },
                },
                complainer: true,
            },
        });
    });
}
exports.viewComplaintsOfUser = viewComplaintsOfUser;
function viewUnAllocatedComplaints() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        return yield prisma.complaint.findMany({
            where: { institutionId: null },
            include: {
                complainer: true,
                investigation: true,
            },
        });
    });
}
exports.viewUnAllocatedComplaints = viewUnAllocatedComplaints;
