"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authenticated_1 = tslib_1.__importDefault(require("../../middleware/authenticated"));
const controllers_1 = require("./controllers");
const investigationRouter = express_1.default.Router();
investigationRouter.use(authenticated_1.default);
investigationRouter
    .route('/')
    .get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const investigations = yield (0, controllers_1.viewInvestigations)();
        return res.json(investigations);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .post((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { investigationDescription, complaintId } = req.body;
        const newInvestigation = yield (0, controllers_1.startInvestigation)(investigationDescription, complaintId);
        return res.json(newInvestigation);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
investigationRouter.route('/captureAction').post((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { investigationStageId, actionName, actionDescription, actionUserId } = req.body;
        const action = yield (0, controllers_1.captureAction)(investigationStageId, actionName, actionDescription, actionUserId);
        return res.json(action);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
investigationRouter.route('/completeStage/:id').put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const investigationStageId = parseInt(req.params.id);
        const stage = yield (0, controllers_1.completeInvestigationStage)(investigationStageId);
        if (stage)
            return res.status(200).json({ message: 'success' });
        else
            return res.status(500).json({ message: 'failed' });
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
investigationRouter
    .route('/:id')
    .get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const investigationId = parseInt(req.params.id);
        const investigation = yield (0, controllers_1.viewInvestigation)(investigationId);
        return res.json(investigation);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .patch((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const investigationId = parseInt(req.params.id);
        const { officeId } = req.body;
        const updatedInvestigation = yield (0, controllers_1.allocateInvestigation)(investigationId, officeId);
        return res.json(updatedInvestigation);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
investigationRouter.route('/:id/addInvolvedParties').patch((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const investigationId = parseInt(req.params.id);
        const { officeIds } = req.body;
        const updatedInvestigation = yield (0, controllers_1.addInvolvedParties)(investigationId, officeIds);
        if (updatedInvestigation)
            return res.status(200).json({ message: 'success' });
        else
            return res.status(500).json({ message: 'failed' });
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
exports.default = investigationRouter;
