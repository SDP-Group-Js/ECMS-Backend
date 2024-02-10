const admin = require('firebase-admin');

const serviceAccount = require('./sdpgroupjs-firebase-adminsdk-fe3do-6bd3295583.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

/**
 * Decodes the JSON Web Token sent via the frontend app
 * Makes the currentUser (firebase) data available on the body.
 */

export default async function authenticate(req: any, res: any, next: any) {
  if (req.headers?.authorization?.startsWith('Bearer ')) {
    const idToken = req.headers.authorization.split('Bearer ')[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      return next();
    } catch (err) {
      console.log(err);
    }
  }

  return res.send({
    error: 'Unauthorised',
  });
}
