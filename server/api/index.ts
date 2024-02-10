import express, { Router } from 'express';
import complaintRouter from './complaint/complaint.router';
import institutionRouter from './institution/institution.router';
import investigationRouter from './investigation/investigation.router';
import userRouter from './user/user.router';
import workflowRouter from './workflow/workflow.router';

const apiRouter: Router = express.Router();

apiRouter.use('/complaint', complaintRouter);
apiRouter.use('/institution', institutionRouter);
apiRouter.use('/investigation', investigationRouter);
apiRouter.use('/workflow', workflowRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;
