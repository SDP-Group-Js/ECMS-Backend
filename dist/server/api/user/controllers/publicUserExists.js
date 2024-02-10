"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function publicUserExists(userNIC) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const publicUser = yield prisma.publicUser.findUnique({
            where: { nic: userNIC },
        });
        if (publicUser)
            return true;
        return false;
    });
}
exports.default = publicUserExists;
