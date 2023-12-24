import express, { Request, Response, Router } from "express"
import {
  reportComplaint,
  viewComplaint,
  allocateComplaint,
  viewComplaints,
  viewUnAllocatedComplaints,
  viewComplaintsOfUser
} from "./controllers"
import authenticate from "../../middleware/authenticated"

interface Complaint {
  complaintTitle: string
  complaintDescription: string
  complainerId: string
}

interface Allocation {
  complaintId: number
  institutionId: string
}

interface ComplaintsOfUser {
  userId: string
}

const complaintRouter: Router = express.Router()

complaintRouter.use(authenticate)

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

complaintRouter.route("/unallocatedComplaints").get(async (req, res) => {
  const complaints = await viewUnAllocatedComplaints()
  return res.json(complaints)
})

complaintRouter.route("/:id").get(async (req: Request, res: Response) => {
  const id = parseInt(req.params.id)
  const complaint = await viewComplaint(id)
  return res.json(complaint)
})

complaintRouter
  .route("/userComplaints/:userId")
  .get(async (req: Request, res: Response) => {
    const userId = req.params.userId.toString()
    const complaints = await viewComplaintsOfUser(userId)
    return res.json(complaints)
  })

export default complaintRouter
