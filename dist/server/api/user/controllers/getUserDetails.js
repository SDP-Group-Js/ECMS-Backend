"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = exports.getECMSUser = exports.getPublicUser = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function getPublicUser(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const publicUser = yield prisma.publicUser.findUnique({
                where: { id: userId },
            });
            if (!publicUser)
                throw new Error(`User not found`);
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
exports.getPublicUser = getPublicUser;
function getECMSUser(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                include: {
                    office: {
                        include: {
                            users: true,
                            assignedInvestigations: {
                                include: {
                                    complaint: { include: { complainer: true, institution: true } },
                                    investigationStages: {
                                        include: { actions: { include: { user: true } } },
                                    },
                                    involvedParties: {
                                        include: {
                                            Institution: true,
                                            Division: true,
                                            Branch: true,
                                            BeatOffice: true,
                                        },
                                    },
                                    institutionWorkflow: true,
                                },
                            },
                            involvedInvestigations: {
                                include: {
                                    complaint: { include: { complainer: true, institution: true } },
                                    investigationStages: {
                                        include: { actions: { include: { user: true } } },
                                    },
                                    involvedParties: true,
                                },
                            },
                            workflows: { include: { office: true, investigations: true } },
                            Institution: {
                                include: {
                                    complaints: {
                                        include: { complainer: true, investigation: true },
                                    },
                                    divisions: {
                                        include: { office: true },
                                    },
                                },
                            },
                            Division: {
                                include: {
                                    Institution: {
                                        include: {
                                            complaints: {
                                                include: { complainer: true, investigation: true },
                                            },
                                            office: true,
                                        },
                                    },
                                    branches: {
                                        include: { office: true },
                                    },
                                },
                            },
                            Branch: {
                                include: {
                                    Division: {
                                        include: {
                                            Institution: {
                                                include: {
                                                    complaints: {
                                                        include: { complainer: true, investigation: true },
                                                    },
                                                    office: true,
                                                },
                                            },
                                        },
                                    },
                                    offices: { include: { office: true } },
                                },
                            },
                            BeatOffice: {
                                include: {
                                    Branch: {
                                        include: {
                                            Division: {
                                                include: {
                                                    Institution: {
                                                        include: {
                                                            complaints: {
                                                                include: { complainer: true, investigation: true },
                                                            },
                                                            office: true,
                                                        },
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!user)
                throw new Error(`User not found`);
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
exports.getECMSUser = getECMSUser;
function getUser(userId) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield prisma.user.findUnique({
                where: { id: userId },
                include: {
                    office: {
                        include: {
                            assignedInvestigations: {
                                include: {
                                    investigationStages: {
                                        include: { actions: { include: { user: true } } },
                                    },
                                },
                            },
                            workflows: true,
                        },
                    },
                },
            });
            if (!user)
                throw new Error(`User not found`);
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
exports.getUser = getUser;
