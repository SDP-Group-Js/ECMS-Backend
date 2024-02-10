"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = exports.updatePublicUser = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
var UserRole;
(function (UserRole) {
    UserRole["SystemAdmin"] = "SystemAdmin";
    UserRole["OfficeAdmin"] = "OfficeAdmin";
    UserRole["ComplaintHandler"] = "ComplaintHandler";
    UserRole["InvestigationHandler"] = "InvestigationHandler";
    UserRole["Viewer"] = "Viewer";
    UserRole["FieldOfficer"] = "FieldOfficer";
})(UserRole || (UserRole = {}));
function updatePublicUser(userId, userNIC, userName, userPhone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const publicUser = yield prisma.publicUser.update({
                where: { id: userId },
                data: { nic: userNIC, name: userName, phone: userPhone },
            });
            if (!publicUser)
                throw new Error(`Public User with Id ${userId} not updated`);
            return publicUser;
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
exports.updatePublicUser = updatePublicUser;
function updateUser(userId, userName, userOfficeId, userRole) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.update({
                where: { id: userId },
                data: {
                    name: userName,
                    office: { connect: { id: userOfficeId } },
                    userRole: userRole,
                },
            });
            if (!user)
                throw new Error(`Public User with Id ${userId} not updated`);
            return user;
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
exports.updateUser = updateUser;
