import { Office } from '@prisma/client';
import express, { Request, Response, Router } from 'express';
import authenticate from '../../middleware/authenticated';
import { createOffice, updateOffice, viewInstitutions, viewOffice, viewOffices } from './controllers';

enum OfficeType {
  Institution = 'Institution',
  Division = 'Division',
  Branch = 'Branch',
  BeatOffice = 'BeatOffice',
}

interface OfficeData {
  officeName: string;
  officeDescription: string;
  officeType: OfficeType;
  parentOfficeId: string | null | undefined;
}

const institutionRouter: Router = express.Router();

institutionRouter.use(authenticate);

institutionRouter
  .route('/')
  .get(async (req: Request, res: Response) => {
    try {
      const offices: Office[] = await viewOffices();
      res.json(offices);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  })
  .post(async (req: Request, res: Response) => {
    try {
      const officeData: OfficeData = req.body;
      const newOffice = await createOffice(officeData);
      return res.json(newOffice);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  });

institutionRouter.route('/institutions').get(async (req: Request, res: Response) => {
  try {
    const institutions: Office[] = await viewInstitutions();
    res.json(institutions);
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
});

institutionRouter
  .route('/:id')
  .get(async (req: Request, res: Response) => {
    try {
      const officeId: string = req.params.id.toString();
      const office = await viewOffice(officeId);
      return res.json(office);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  })
  .put(async (req: Request, res: Response) => {
    try {
      const officeId: string = req.params.id.toString();
      const { officeName, officeDescription, officeType }: OfficeData = req.body;
      const updatedOffice = await updateOffice({
        officeId,
        officeName,
        officeDescription,
        officeType,
      });
      return res.json(updatedOffice);
    } catch (error: any) {
      res.status(500).json({ error: error?.message });
    }
  });

export default institutionRouter;
