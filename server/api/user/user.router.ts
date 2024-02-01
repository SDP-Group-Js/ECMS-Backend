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
  publicUserExists,
  createUserByAdmin,
  createPublicUserByAdmin
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

interface PublicUserToBeCreatedByAdmin {
  userEmail: string
  userPassword: string
  userNIC: string
  userName: string
  userPhone: string
}

interface UserToBeCreatedByAdmin {
  userEmail: string
  userPassword: string
  userName: string
  userOfficeId: string
  userRole: UserRole
}

const userRouter: Router = express.Router()

userRouter
  .route("/users")
  .get(authenticate, async (req: Request, res: Response) => {
    try {
      const users = await getUsers()
      res.json(users)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .post(authenticate, async (req: Request, res: Response) => {
    try {
      const { userId, userName, userOfficeId, userRole }: User = req.body
      const newUser = await createUser(userId, userName, userOfficeId, userRole)
      return res.json(newUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .put(authenticate, async (req: Request, res: Response) => {
    try {
      const { userId, userName, userOfficeId, userRole }: User = req.body
      const updatedUser = await updateUser(
        userId,
        userName,
        userOfficeId,
        userRole
      )
      return res.json(updatedUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/users/:id")
  .get(authenticate, async (req: any, res: Response) => {
    try {
      const userId: string = req.params.id
      const user = await getUser(userId)
      return res.json(user)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/users/getDetails/:id")
  .get(authenticate, async (req: any, res: Response) => {
    try {
      const userId: string = req.params.id
      console.log(userId)
      const user = await getECMSUser(userId)
      console.log(user)
      return res.json(user)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/publicUsers")
  .get(authenticate, async (req: Request, res: Response) => {
    try {
      const publicUsers = await getPublicUsers()
      res.json(publicUsers)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { userId, userNIC, userName, userPhone }: PublicUser = req.body
      const newPublicUser = await registerUser(
        userId,
        userNIC,
        userName,
        userPhone
      )
      return res.json(newPublicUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })
  .put(authenticate, async (req: Request, res: Response) => {
    try {
      const { userId, userNIC, userName, userPhone }: PublicUser = req.body
      const updatedPublicUser = await updatePublicUser(
        userId,
        userNIC,
        userName,
        userPhone
      )
      return res.json(updatedPublicUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/publicUsers/:id")
  .get(authenticate, async (req: Request, res: Response) => {
    try {
      const userId: string = req.params.id.toString()
      const publicUser = await getPublicUser(userId)
      return res.json(publicUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/publicUsers/:nic/exists")
  .get(async (req: Request, res: Response) => {
    try {
      const userNIC: string = req.params.nic.toString()
      const nicExists: boolean = await publicUserExists(userNIC)
      if (nicExists) return res.json({ publicUserWithNicExists: true })
      else return res.json({ publicUserWithNicExists: false })
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/admin/createUserByAdmin")
  .post(authenticate, async (req: Request, res: Response) => {
    try {
      const {
        userEmail,
        userPassword,
        userName,
        userOfficeId,
        userRole
      }: UserToBeCreatedByAdmin = req.body
      const newUser = await createUserByAdmin(
        userEmail,
        userPassword,
        userName,
        userOfficeId,
        userRole
      )
      return res.json(newUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

userRouter
  .route("/admin/createPublicUserByAdmin")
  .post(authenticate, async (req: Request, res: Response) => {
    try {
      const {
        userEmail,
        userPassword,
        userNIC,
        userName,
        userPhone
      }: PublicUserToBeCreatedByAdmin = req.body
      const newUser = await createPublicUserByAdmin(
        userEmail,
        userPassword,
        userNIC,
        userName,
        userPhone
      )
      return res.json(newUser)
    } catch (error: any) {
      res.status(500).json({ error: error?.message })
    }
  })

export default userRouter
