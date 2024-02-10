"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authenticated_1 = tslib_1.__importDefault(require("../../middleware/authenticated"));
const controllers_1 = require("./controllers");
const complaintRouter = express_1.default.Router();
complaintRouter.use(authenticated_1.default);
complaintRouter
    .route('/')
    .get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield (0, controllers_1.viewComplaints)();
        res.json(complaints);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .post((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complaintTitle, complaintDescription, complainerId } = req.body;
        const complaint = yield (0, controllers_1.reportComplaint)(complaintTitle, complaintDescription, complainerId);
        return res.json(complaint);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .patch((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { complaintId, institutionId } = req.body;
        const complaint = yield (0, controllers_1.allocateComplaint)(complaintId, institutionId);
        return res.json(complaint);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
complaintRouter.route('/unallocatedComplaints').get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield (0, controllers_1.viewUnAllocatedComplaints)();
        return res.json(complaints);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
complaintRouter.route('/:id').get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        const complaint = yield (0, controllers_1.viewComplaint)(id);
        return res.json(complaint);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
complaintRouter.route('/userComplaints/:userId').get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId.toString();
        const complaints = yield (0, controllers_1.viewComplaintsOfUser)(userId);
        return res.json(complaints);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
exports.default = complaintRouter;
