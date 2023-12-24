import express, { Request, Response, Router } from "express"
import {
  createOffice,
  updateOffice,
  viewOffices,
  viewOffice,
  viewInstitutions
} from "./controllers"
import { Office } from "@prisma/client"
import authenticate from "../../middleware/authenticated"

enum OfficeType {
  Institution = "Institution",
  Division = "Division",
  Branch = "Branch",
  BeatOffice = "BeatOffice"
}

interface OfficeData {
  officeName: string
  officeDescription: string
  officeType: OfficeType
  parentOfficeId: string | null | undefined
}

const institutionRouter: Router = express.Router()

institutionRouter.use(authenticate)

institutionRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const offices: Office[] = await viewOffices()
    res.json(offices)
  })
  .post(async (req: Request, res: Response) => {
    const officeData: OfficeData = req.body
    const newOffice = await createOffice(officeData)
    return res.json(newOffice)
  })

institutionRouter
  .route("/institutions")
  .get(async (req: Request, res: Response) => {
    const institutions: Office[] = await viewInstitutions()
    res.json(institutions)
  })

institutionRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const officeId: string = req.params.id.toString()
    const office = await viewOffice(officeId)
    return res.json(office)
  })
  .put(async (req: Request, res: Response) => {
    const officeId: string = req.params.id.toString()
    const {
      officeName,
      officeDescription,
      officeType,
      parentOfficeId
    }: OfficeData = req.body
    const updatedOffice = await updateOffice({
      officeId,
      officeName,
      officeDescription,
      officeType,
      parentOfficeId
    })
    return res.json(updatedOffice)
  })

export default institutionRouter
