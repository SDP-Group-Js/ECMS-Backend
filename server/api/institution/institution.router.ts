import express, { Request, Response, Router } from "express"
import { createInstitution } from "./controllers"
import { viewInstitutions } from "./controllers/viewInstitution"

interface Institution {
  institutionName: string
}

const institutionRouter: Router = express.Router()

institutionRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const institutions = await viewInstitutions()
    res.json(institutions)
  })
  .post(async (req: Request, res: Response) => {
    const { institutionName }: Institution = req.body
    const newInstitution = await createInstitution(institutionName)
    return res.json(newInstitution)
  })

export default institutionRouter
