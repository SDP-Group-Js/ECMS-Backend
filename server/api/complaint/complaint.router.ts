import express, { Request, Response, Router } from 'express';
import authenticate from '../../middleware/authenticated';
import { allocateComplaint, reportComplaint, viewComplaint, viewComplaints, viewComplaintsOfUser, viewUnAllocatedComplaints } from './controllers';

interface Complaint {
  complaintTitle: string;
  complaintDescription: string;
  complainerId: string;
}

interface Allocation {
  complaintId: number;
  institutionId: string;
}

interface ComplaintsOfUser {
  userId: string;
}

const complaintRouter: Router = express.Router();

complaintRouter.use(authenticate);

complaintRouter
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const complaints = await viewComplaints();
      console.log(complaints)
      res.json(complaints);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const { complaintTitle, complaintDescription, complainerId }: Complaint = req.body;
      const complaint = await reportComplaint(complaintTitle, complaintDescription, complainerId);
      return res.json(complaint);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  })
  .patch(async (req: Request, res: Response) => {
    try {
      const { complaintId, institutionId }: Allocation = req.body;
      const complaint = await allocateComplaint(complaintId, institutionId);
      return res.json(complaint);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  });

complaintRouter.route('/unallocatedComplaints').get(async (req, res) => {
  try {
    const complaints = await viewUnAllocatedComplaints();
    return res.json(complaints);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

complaintRouter.route('/:id').get(async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const complaint = await viewComplaint(id);
    return res.json(complaint);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

complaintRouter.route('/userComplaints/:userId').get(async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId.toString();
    const complaints = await viewComplaintsOfUser(userId);
    return res.json(complaints);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

export default complaintRouter;
