import { Router } from "express";

const workflowRouter = Router();

workflowRouter.get('/', (req, res) => res.json({title: "Workflow route"}));


export default workflowRouter;