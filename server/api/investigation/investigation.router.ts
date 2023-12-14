import express, { Request, Response, Router } from "express"
import { allocateInvestigation, startInvestigation } from "./controllers"
import viewInvestigations from "./controllers/viewInvestigations"
import viewInvestigation from "./controllers/viewInvestigation"
import {
  allocateInvestigationToDivision,
  allocateInvestigationToInstitutions,
  allocateInvestigationToOffice
} from "./controllers/allocateInvestigation"

interface InvestigationToCreate {
  institutionId: string
  complaintId: number
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
    const { institutionId, complaintId }: InvestigationToCreate = req.body
    const newInvestigation = await startInvestigation(
      institutionId,
      complaintId
    )
    return res.status(200).json(newInvestigation)
  })

investigationRouter.route("/:id").get(async (req: Request, res: Response) => {
  const investigationId = parseInt(req.params.id)
  const investigation = await viewInvestigation(investigationId)
  return res.status(200).json(investigation)
})

//Allocations
investigationRouter.patch(
  "/:id/allocate",
  async (req: Request, res: Response) => {
    const investigationId = parseInt(req.params.id)
    const { institutionIds, divisionId, officeId }: InvestigationToAllocate =
      req.body
    const investigation = await allocateInvestigation(
      investigationId,
      institutionIds,
      divisionId,
      officeId
    )
    return res.status(200).json(investigation)
  }
)

investigationRouter.patch(
  "/:id/allocate-to-institutions",
  async (req: Request, res: Response) => {
    const investigationId = parseInt(req.params.id)
    const { institutionIds }: InvestigationToAllocateToInstitutions = req.body
    const investigation = await allocateInvestigationToInstitutions(
      investigationId,
      institutionIds
    )
    return res.status(200).json(investigation)
  }
)

investigationRouter.patch(
  "/:id/allocate-to-division",
  async (req: Request, res: Response) => {
    const investigationId = parseInt(req.params.id)
    const { divisionId }: InvestigationToAllocateToDivision = req.body
    const investigation = await allocateInvestigationToDivision(
      investigationId,
      divisionId
    )
    return res.status(200).json(investigation)
  }
)

investigationRouter.patch(
  "/:id/allocate-to-office",
  async (req: Request, res: Response) => {
    const investigationId = parseInt(req.params.id)
    const { officeId }: InvestigationToAllocateToOffice = req.body
    const investigation = await allocateInvestigationToOffice(
      investigationId,
      officeId
    )
    return res.status(200).json(investigation)
  }
)

export default investigationRouter
