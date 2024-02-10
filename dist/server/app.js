"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const api_1 = tslib_1.__importDefault(require("./api"));
const authenticated_1 = tslib_1.__importDefault(require("./middleware/authenticated"));
require('dotenv').config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.use(authenticated_1.default);
const port = process.env.PORT || 8080;
app.get('/', (req, res) => {
    return res.json({ message: `Server is running in port ${port}` });
});
exports.default = app;
