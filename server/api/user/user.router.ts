import express, { Request, Response, Router } from "express"
import {
  createUser,
  registerUser,
  updateUser,
  updatePublicUser,
  getUser,
  getECMSUser,
  getPublicUser,
  getUsers,
  getPublicUsers,
  publicUserExists
} from "./controllers"
import authenticate from "../../middleware/authenticated"

enum UserRole {
  SystemAdmin = "SystemAdmin",
  OfficeAdmin = "OfficeAdmin",
  ComplaintHandler = "ComplaintHandler",
  InvestigationHandler = "InvestigationHandler",
  Viewer = "Viewer",
  FieldOfficer = "FieldOfficer"
}

interface PublicUser {
  userId: string
  userNIC: string
  userName: string
  userPhone: string
}

interface User {
  userId: string
  userName: string
  userOfficeId: string
  userRole: UserRole
}

const userRouter: Router = express.Router()

userRouter
  .route("/users")
  .get(authenticate, async (req: Request, res: Response) => {
    const users = await getUsers()
    res.json(users)
  })
  .post(authenticate, async (req: Request, res: Response) => {
    const { userId, userName, userOfficeId, userRole }: User = req.body
    const newUser = await createUser(userId, userName, userOfficeId, userRole)
    return res.json(newUser)
  })
  .put(authenticate, async (req: Request, res: Response) => {
    const { userId, userName, userOfficeId, userRole }: User = req.body
    const updatedUser = await updateUser(
      userId,
      userName,
      userOfficeId,
      userRole
    )
    return res.json(updatedUser)
  })

userRouter.route("/users/:id").get(async (req: any, res: Response) => {
  const userId: string = req.params.id
  const user = await getUser(userId)
  return res.json(user)
})

userRouter
  .route("/users/getDetails/:id")
  .get(authenticate, async (req: any, res: Response) => {
    const userId: string = req.params.id
    console.log(userId)
    const user = await getECMSUser(userId)
    console.log(user)
    return res.json(user)
  })

userRouter
  .route("/publicUsers")
  .get(authenticate, async (req: Request, res: Response) => {
    const publicUsers = await getPublicUsers()
    res.json(publicUsers)
  })
  .post(async (req: Request, res: Response) => {
    const { userId, userNIC, userName, userPhone }: PublicUser = req.body
    const newPublicUser = await registerUser(
      userId,
      userNIC,
      userName,
      userPhone
    )
    return res.json(newPublicUser)
  })
  .put(authenticate, async (req: Request, res: Response) => {
    const { userId, userNIC, userName, userPhone }: PublicUser = req.body
    const updatedPublicUser = await updatePublicUser(
      userId,
      userNIC,
      userName,
      userPhone
    )
    return res.json(updatedPublicUser)
  })

userRouter
  .route("/publicUsers/:id")
  .get(authenticate, async (req: Request, res: Response) => {
    const userId: string = req.params.id.toString()
    const publicUser = await getPublicUser(userId)
    return res.json(publicUser)
  })

userRouter
  .route("/publicUsers/:nic/exists")
  .get(async (req: Request, res: Response) => {
    const userNIC: string = req.params.nic.toString()
    const nicExists: boolean = await publicUserExists(userNIC)
    if (nicExists) return res.json({ publicUserWithNicExists: true })
    else return res.json({ publicUserWithNicExists: false })
  })

export default userRouter
