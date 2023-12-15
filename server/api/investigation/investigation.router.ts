import express, { Request, Response, Router } from "express"
//import { startInvestigation } from "./controllers"
import viewInvestigations from "./controllers/viewInvestigations"
import viewInvestigation from "./controllers/viewInvestigation"
import { startInvestigation } from "./controllers"

interface Investigation {
  investigationDescription: string
  complaintId: number
  institutionId: string
}

interface InvestigationToAllocate {
  institutionIds: string[]
  divisionId: string
  officeId: string
}

interface InvestigationToAllocateToInstitutions {
  institutionIds: string[]
}

interface InvestigationToAllocateToDivision {
  divisionId: string
}

interface InvestigationToAllocateToOffice {
  officeId: string
}

const investigationRouter: Router = express.Router()

investigationRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const investigations = await viewInvestigations()
    return res.status(200).json(investigations)
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
    return res.status(200).json(newInvestigation)
  })

investigationRouter.route("/:id").get(async (req: Request, res: Response) => {
  const investigationId = parseInt(req.params.id)
  const investigation = await viewInvestigation(investigationId)
  return res.status(200).json(investigation)
})

export default investigationRouter
