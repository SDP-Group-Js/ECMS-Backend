"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authenticated_1 = tslib_1.__importDefault(require("../../middleware/authenticated"));
const controllers_1 = require("./controllers");
var OfficeType;
(function (OfficeType) {
    OfficeType["Institution"] = "Institution";
    OfficeType["Division"] = "Division";
    OfficeType["Branch"] = "Branch";
    OfficeType["BeatOffice"] = "BeatOffice";
})(OfficeType || (OfficeType = {}));
const institutionRouter = express_1.default.Router();
institutionRouter.use(authenticated_1.default);
institutionRouter
    .route('/')
    .get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const offices = yield (0, controllers_1.viewOffices)();
        res.json(offices);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .post((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const officeData = req.body;
        const newOffice = yield (0, controllers_1.createOffice)(officeData);
        return res.json(newOffice);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
institutionRouter.route('/institutions').get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const institutions = yield (0, controllers_1.viewInstitutions)();
        res.json(institutions);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
institutionRouter
    .route('/:id')
    .get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const officeId = req.params.id.toString();
        const office = yield (0, controllers_1.viewOffice)(officeId);
        return res.json(office);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .put((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const officeId = req.params.id.toString();
        const { officeName, officeDescription, officeType } = req.body;
        const updatedOffice = yield (0, controllers_1.updateOffice)({
            officeId,
            officeName,
            officeDescription,
            officeType,
        });
        return res.json(updatedOffice);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
exports.default = institutionRouter;
