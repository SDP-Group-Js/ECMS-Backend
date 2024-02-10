"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewUnAllocatedComplaints = exports.viewComplaintsOfUser = exports.viewComplaints = exports.viewComplaint = exports.reportComplaint = exports.allocateComplaint = void 0;
const tslib_1 = require("tslib");
const allocateComplaint_1 = tslib_1.__importDefault(require("./allocateComplaint"));
exports.allocateComplaint = allocateComplaint_1.default;
const reportComplaint_1 = tslib_1.__importDefault(require("./reportComplaint"));
exports.reportComplaint = reportComplaint_1.default;
const viewComplaint_1 = tslib_1.__importDefault(require("./viewComplaint"));
exports.viewComplaint = viewComplaint_1.default;
const viewComplaints_1 = tslib_1.__importStar(require("./viewComplaints"));
exports.viewComplaints = viewComplaints_1.default;
Object.defineProperty(exports, "viewComplaintsOfUser", { enumerable: true, get: function () { return viewComplaints_1.viewComplaintsOfUser; } });
Object.defineProperty(exports, "viewUnAllocatedComplaints", { enumerable: true, get: function () { return viewComplaints_1.viewUnAllocatedComplaints; } });
