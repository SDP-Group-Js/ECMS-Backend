"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function viewComplaint(complaintId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const complaint = yield prisma.complaint.findUnique({
            where: { id: complaintId },
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
        if (!complaint)
            throw new Error(`Complaint with Id ${complaintId} not found`);
        return complaint;
    });
}
exports.default = viewComplaint;
