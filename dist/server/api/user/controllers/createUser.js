"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
function createUser(userId, userName, userOfficeId, userRole) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.create({
                data: {
                    id: userId,
                    name: userName,
                    office: { connect: { id: userOfficeId } },
                    userRole: userRole,
                },
            });
            if (!user)
                throw new Error(`User not created`);
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
exports.default = createUser;
