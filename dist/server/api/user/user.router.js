"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authenticated_1 = tslib_1.__importDefault(require("../../middleware/authenticated"));
const controllers_1 = require("./controllers");
var UserRole;
(function (UserRole) {
    UserRole["SystemAdmin"] = "SystemAdmin";
    UserRole["OfficeAdmin"] = "OfficeAdmin";
    UserRole["ComplaintHandler"] = "ComplaintHandler";
    UserRole["InvestigationHandler"] = "InvestigationHandler";
    UserRole["Viewer"] = "Viewer";
    UserRole["FieldOfficer"] = "FieldOfficer";
})(UserRole || (UserRole = {}));
const userRouter = express_1.default.Router();
userRouter
    .route('/users')
    .get(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, controllers_1.getUsers)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .post(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userName, userOfficeId, userRole } = req.body;
        const newUser = yield (0, controllers_1.createUser)(userId, userName, userOfficeId, userRole);
        return res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .put(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userName, userOfficeId, userRole } = req.body;
        const updatedUser = yield (0, controllers_1.updateUser)(userId, userName, userOfficeId, userRole);
        return res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter.route('/users/:id').get(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const user = yield (0, controllers_1.getUser)(userId);
        return res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter.route('/users/getDetails/:id').get(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        console.log(userId);
        const user = yield (0, controllers_1.getECMSUser)(userId);
        console.log(user);
        return res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter
    .route('/publicUsers')
    .get(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const publicUsers = yield (0, controllers_1.getPublicUsers)();
        res.json(publicUsers);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .post((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userNIC, userName, userPhone } = req.body;
        const newPublicUser = yield (0, controllers_1.registerUser)(userId, userNIC, userName, userPhone);
        return res.json(newPublicUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}))
    .put(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, userNIC, userName, userPhone } = req.body;
        const updatedPublicUser = yield (0, controllers_1.updatePublicUser)(userId, userNIC, userName, userPhone);
        return res.json(updatedPublicUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter.route('/publicUsers/:id').get(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id.toString();
        const publicUser = yield (0, controllers_1.getPublicUser)(userId);
        return res.json(publicUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter.route('/publicUsers/:nic/exists').get((req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userNIC = req.params.nic.toString();
        const nicExists = yield (0, controllers_1.publicUserExists)(userNIC);
        if (nicExists)
            return res.json({ publicUserWithNicExists: true });
        else
            return res.json({ publicUserWithNicExists: false });
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter.route('/admin/createUserByAdmin').post(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userPassword, userName, userOfficeId, userRole } = req.body;
        const newUser = yield (0, controllers_1.createUserByAdmin)(userEmail, userPassword, userName, userOfficeId, userRole);
        return res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
userRouter.route('/admin/createPublicUserByAdmin').post(authenticated_1.default, (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userEmail, userPassword, userNIC, userName, userPhone } = req.body;
        const newUser = yield (0, controllers_1.createPublicUserByAdmin)(userEmail, userPassword, userNIC, userName, userPhone);
        return res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error === null || error === void 0 ? void 0 : error.message });
    }
}));
exports.default = userRouter;
