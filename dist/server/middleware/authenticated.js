"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const admin = require('firebase-admin');
const serviceAccount = require('./sdpgroupjs-firebase-adminsdk-fe3do-6bd3295583.json');
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}
function authenticate(req, res, next) {
    var _a, _b;
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        if ((_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.startsWith('Bearer ')) {
            const idToken = req.headers.authorization.split('Bearer ')[1];
            try {
                const decodedToken = yield admin.auth().verifyIdToken(idToken);
                req.user = decodedToken;
                return next();
            }
            catch (err) {
                console.log(err);
            }
        }
        return res.send({
            error: 'Unauthorised',
        });
    });
}
exports.default = authenticate;
