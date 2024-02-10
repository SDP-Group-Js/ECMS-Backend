"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authenticated_1 = tslib_1.__importDefault(require("../../middleware/authenticated"));
const controllers_1 = require("./controllers");
const assignInvestigationStage_1 = tslib_1.__importDefault(require("./controllers/assignInvestigationStage"));
const removeAssignedInvestigationStage_1 = tslib_1.__importDefault(require("./controllers/removeAssignedInvestigationStage"));
const updateInvestigationStage_1 = tslib_1.__importDefault(require("./controllers/updateInvestigationStage"));
const workflowRouter = express_1.default.Router();
workflowRouter.use(authenticated_1.default);
workflowRouter
    .route('/institution')
    .post((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { officeId, stages, name, description } = req.body;
    try {
        const newInstitutionWorkflow = yield (0, controllers_1.createInstitutionWorkflow)(officeId, stages, name, description);
        return res.json({
            message: 'Created New Institution Workflow',
            data: newInstitutionWorkflow,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}))
    .put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { institutionWorkflowId, stages, name, description } = req.body;
    try {
        const updatedInstitutionWorkflow = yield (0, controllers_1.updateInstitutionWorkflow)(institutionWorkflowId, stages, name, description);
        return res.status(200).json({
            message: 'Updated Institution Workflow',
            data: updatedInstitutionWorkflow,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
workflowRouter.route('/investigation').put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { investigationId, institutionWorkflow } = req.body;
    try {
        const updatedInvestigation = yield (0, controllers_1.setInvestigationWorkflow)(investigationId, institutionWorkflow);
        return res.status(200).json({
            message: 'Updated Investigation',
            data: updatedInvestigation,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
workflowRouter.route('/investigationStage').put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { investigationStageId, description, status, tasks } = req.body;
    try {
        const updatedInvestigationStage = yield (0, updateInvestigationStage_1.default)(investigationStageId, description, status, tasks);
        return res.status(200).json({
            message: 'Updated Investigation Stage',
            data: updatedInvestigationStage,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
workflowRouter.route('/assignedInvestigationStage').put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { investigationStageId, officeId, officers } = req.body;
    try {
        const updatedInvestigation = yield (0, assignInvestigationStage_1.default)(investigationStageId, officeId, officers);
        return res.status(200).json({
            message: 'Updated Investigation Stage',
            data: updatedInvestigation,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
workflowRouter.route('removeAssignedInvestigationStage').put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const { investigationStageId, officeId, officers } = req.body;
    try {
        const updatedInvestigation = yield (0, removeAssignedInvestigationStage_1.default)(investigationStageId, officeId, officers);
        return res.status(200).json({
            message: 'Updated Investigation Stage',
            data: updatedInvestigation,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            error: error === null || error === void 0 ? void 0 : error.message,
        });
    }
}));
exports.default = workflowRouter;
