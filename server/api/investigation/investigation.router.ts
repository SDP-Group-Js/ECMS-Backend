import express, { Request, Response, Router } from "express"
//import { startInvestigation } from "./controllers"
import viewInvestigations from "./controllers/viewInvestigations"
import viewInvestigation from "./controllers/viewInvestigation"
import { allocateInvestigation, startInvestigation } from "./controllers"

interface Investigation {
  investigationDescription: string
  complaintId: number
  institutionId: string
}

interface InvestigationToAllocate {
  officeId: string
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

investigationRouter.route("/:id").patch(async (req: Request, res: Response) => {
  const investigationId = parseInt(req.params.id)
  const { officeId }: InvestigationToAllocate = req.body
  const updatedInvestigation = await allocateInvestigation(
    investigationId,
    officeId
  )
  return res.json(updatedInvestigation)
})

export default investigationRouter
