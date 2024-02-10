"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const firebase_admin_1 = tslib_1.__importDefault(require("firebase-admin"));
const prisma = new client_1.PrismaClient();
function createUser(userEmail, userPassword, userNIC, userName, userPhone) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const authUser = yield firebase_admin_1.default.auth().createUser({
                email: userEmail,
                password: userPassword,
            });
            const userId = authUser.uid;
            const user = yield prisma.publicUser.create({
                data: {
                    id: userId,
                    nic: userNIC,
                    name: userName,
                    phone: userPhone,
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
