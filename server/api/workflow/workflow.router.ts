import express, { Router } from "express"
import {
  createInstitutionWorkflow,
  setInvestigationWorkflow,
  updateInstitutionWorkflow
} from "./controllers"
import updateInvestigationStage from "./controllers/updateInvestigationStage"

const workflowRouter: Router = express.Router()

workflowRouter
  .route("/institution")
  .post(async (req, res) => {
    const { institutionId, officeId, stages, name, description } = req.body
    try {
      const newInstitutionWorkflow = await createInstitutionWorkflow(
        institutionId,
        officeId,
        stages,
        name,
        description
      )

      return res.json({
        message: "Created New Institution Workflow",
        data: newInstitutionWorkflow
      })
    } catch (error: any) {
      console.log(error)
      res.status(500).json({
        error: error?.message
      })
    }
  })
  .put(async (req, res) => {
    const { institutionWorkflowId, stages, name, description } = req.body
    try {
      const updatedInstitutionWorkflow = await updateInstitutionWorkflow(
        institutionWorkflowId,
        stages,
        name,
        description
      )

      return res.status(200).json({
        message: "Updated Institution Workflow",
        data: updatedInstitutionWorkflow
      })
    } catch (error: any) {
      console.log(error)
      return res.status(500).json({
        error: error?.message
      })
    }
  })

workflowRouter.route("/investigation").put(async (req, res) => {
  const { investigationId, institutionWorkflow } = req.body
  try {
    const updatedInvestigation = await setInvestigationWorkflow(
      investigationId,
      institutionWorkflow
    )
    return res.status(200).json({
      message: "Updated Investigation Stage",
      data: updatedInvestigation
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error?.message
    })
  }
})

workflowRouter.route("/investigationStage").put(async (req, res) => {
  const { investigationStageId, description, status, tasks } = req.body
  try {
    const updatedInvestigationStage = await updateInvestigationStage(
      investigationStageId,
      description,
      status,
      tasks
    )
    return res.status(200).json({
      message: "Updated Investigation Stage",
      data: updatedInvestigationStage
    })
  } catch (error: any) {
    console.log(error)
    res.status(500).json({
      error: error?.message
    })
  }
})

export default workflowRouter
