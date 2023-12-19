import express, { Request, Response, Router } from "express"
import {
  reportComplaint,
  viewComplaint,
  allocateComplaint,
  viewComplaints
} from "./controllers"

interface Complaint {
  complaintTitle: string
  complaintDescription: string
  complainerId: string
}

interface Allocation {
  complaintId: number
  institutionId: string
}

const complaintRouter: Router = express.Router()

complaintRouter
  .route("/")
  .get(async (req: Request, res: Response) => {
    const complaints = await viewComplaints()
    res.json(complaints)
  })
  .post(async (req: Request, res: Response) => {
    const { complaintTitle, complaintDescription, complainerId }: Complaint =
      req.body
    const complaint = await reportComplaint(
      complaintTitle,
      complaintDescription,
      complainerId
    )
    return res.json(complaint)
  })
  .patch(async (req: Request, res: Response) => {
    const { complaintId, institutionId }: Allocation = req.body
    const complaint = await allocateComplaint(complaintId, institutionId)
    return res.json(complaint)
  })

complaintRouter.route("/:id").get(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const complaint = await viewComplaint(id)
  return res.json(complaint)
})

export default complaintRouter