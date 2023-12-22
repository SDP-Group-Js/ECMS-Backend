import express, { Request, Response, Router } from "express"
import {
  startInvestigation,
  allocateInvestigation,
  viewInvestigation,
  viewInvestigations,
  addInvolvedParties,
  captureAction,
  completeInvestigationStage
} from "./controllers"
import authenticate from "../../middleware/authenticated"

interface Investigation {
  investigationDescription: string
  complaintId: number
}

interface InvestigationToAllocate {
  officeId: string
}

interface InvestigationToAddInterestedParties {
  officeIds: string[]
}

interface INvestigationCaptureAction {
  investigationStageId: number
  actionName: string
  actionDescription: string | null | undefined
  actionUserId: string
}

const investigationRouter: Router = express.Router()

investigationRouter.use(authenticate)

investigationRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const investigations = await viewInvestigations()
    return res.json(investigations)
  })
  .post(async (req: Request, res: Response) => {
    const { investigationDescription, complaintId }: Investigation = req.body
    const newInvestigation = await startInvestigation(
      investigationDescription,
      complaintId
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

investigationRouter
  .route("/captureAction")
  .post(async (req: Request, res: Response) => {
    const {
      investigationStageId,
      actionName,
      actionDescription,
      actionUserId
    }: INvestigationCaptureAction = req.body
    const action = await captureAction(
      investigationStageId,
      actionName,
      actionDescription,
      actionUserId
    )
    return res.json(action)
  })

investigationRouter
  .route("/completeStage/:id")
  .put(async (req: Request, res: Response) => {
    const investigationStageId: number = parseInt(req.params.id)

    const stage = await completeInvestigationStage(investigationStageId)
    if (stage) return res.status(200).json({ message: "success" })
    else return res.status(500).json({ message: "failed" })
  })

export default investigationRouter
