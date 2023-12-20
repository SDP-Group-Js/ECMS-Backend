const admin = require("firebase-admin")

var serviceAccount = require("./sdpgroupjs-firebase-adminsdk-fe3do-f252347927.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

/**
 * Decodes the JSON Web Token sent via the frontend app
 * Makes the currentUser (firebase) data available on the body.
 */

export default async function authenticate(req: any, res: any, next: any) {
  if (req.headers?.authorization?.startsWith("Bearer ")) {
    const idToken = req.headers.authorization.split("Bearer ")[1]

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken)
      req.user = decodedToken
    } catch (err) {
      console.log(err)
    }
  }

  next()
}
