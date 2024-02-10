"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = exports.getPublicUsers = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getPublicUsers() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const publicUsers = yield prisma.publicUser.findMany({ include: { complaints: true } });
            return publicUsers;
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
exports.getPublicUsers = getPublicUsers;
function getUsers() {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield prisma.user.findMany({ include: { office: true } });
            return users;
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
exports.getUsers = getUsers;
