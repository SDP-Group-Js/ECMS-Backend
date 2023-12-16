import express, {Router} from 'express'
import complaintRouter from './complaint/complaint.router'
import institutionRouter from './institution/institution.router'
import investigationRouter from './investigation/investigation.router'
import workflowRouter from './workflow/workflow.router'
import userRouter from './user/user.router'
import allocateComplaint from "./allocateComplaint";
import reportComplaint from "./reportComplaint";
import viewComplaints from "./viewComplaints";

const apiRouter: Router = express.Router()

apiRouter.use("/complaint", complaintRouter)
apiRouter.use("/institution", institutionRouter)
apiRouter.use("/investigation", investigationRouter)
apiRouter.use("/workflow", workflowRouter)
apiRouter.use("/user", userRouter)

export default apiRouter
export { allocateComplaint, reportComplaint, viewComplaints }