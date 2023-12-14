import express, { Request, Response, Router } from "express"
import { startInvestigation } from "./controllers"
import viewInvestigations from "./controllers/viewInvestigations"
import viewInvestigation from "./controllers/viewInvestigation"

interface Investigation {
  institutionId: string
  complaintId: number
}

const investigationRouter: Router = express.Router()

investigationRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const investigations = await viewInvestigations()
    return res.json(investigations)
  })
  .post(async (req: Request, res: Response) => {
    const { institutionId, complaintId }: Investigation = req.body
    const newInvestigation = await startInvestigation(
      institutionId,
      complaintId
    )
    return res.json(newInvestigation)
  })

investigationRouter.route("/:id").get(async (req: Request, res: Response) => {
  const investigationId = parseInt(req.params.id)
  const investigation = await viewInvestigation(investigationId)
  return res.json(investigation)
})

export default investigationRouter
