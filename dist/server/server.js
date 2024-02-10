"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const cors_1 = tslib_1.__importDefault(require("cors"));
require("dotenv");
const express_1 = tslib_1.__importDefault(require("express"));
const helmet_1 = tslib_1.__importDefault(require("helmet"));
const app_1 = tslib_1.__importDefault(require("./app"));
const port = process.env.PORT || 8080;
const server = (0, express_1.default)();
server.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    allowedHeaders: 'Origin, Content-Type, Accept, Authorization',
}));
server.use((0, helmet_1.default)());
server.use(app_1.default);
server.listen(port, () => {
    console.log(`Listening to Port ${port}`);
});
module.exports = server;
