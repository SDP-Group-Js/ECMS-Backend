import express, { Request, Response, Router } from "express"
//import { startInvestigation } from "./controllers"
import viewInvestigations from "./controllers/viewInvestigations"
import viewInvestigation from "./controllers/viewInvestigation"
import { allocateInvestigation, startInvestigation } from "./controllers"
import addInvolvedParties from "./controllers/addInvolvedParties"

interface Investigation {
  investigationDescription: string
  complaintId: number
  institutionId: string
}

interface InvestigationToAllocate {
  officeId: string
}

interface InvestigationToAddInterestedParties {
  officeIds: string[]
}

const investigationRouter: Router = express.Router()

investigationRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const investigations = await viewInvestigations()
    return res.json(investigations)
  })
  .post(async (req: Request, res: Response) => {
    const {
      investigationDescription,
      complaintId,
      institutionId
    }: Investigation = req.body
    const newInvestigation = await startInvestigation(
      investigationDescription,
      complaintId,
      institutionId
    )
    return res.json(newInvestigation)
  })

investigationRouter
  .route("/:id")
  .get(async (req: Request, res: Response) => {
    const investigationId: number = parseInt(req.params.id)
    const investigation = await viewInvestigation(investigationId)
    return res.json(investigation)
  })
  .patch(async (req: Request, res: Response) => {
    const investigationId: number = parseInt(req.params.id)
    const { officeId }: InvestigationToAllocate = req.body
    const updatedInvestigation = await allocateInvestigation(
      investigationId,
      officeId
    )
    return res.json(updatedInvestigation)
  })

investigationRouter
  .route("/:id/addInvolvedParties")
  .patch(async (req: Request, res: Response) => {
    const investigationId: number = parseInt(req.params.id)
    const { officeIds }: InvestigationToAddInterestedParties = req.body
    const updatedInvestigation: boolean = await addInvolvedParties(
      investigationId,
      officeIds
    )
    if (updatedInvestigation)
      return res.status(200).json({ message: "success" })
    else return res.status(500).json({ message: "failed" })
  })

export default investigationRouter
