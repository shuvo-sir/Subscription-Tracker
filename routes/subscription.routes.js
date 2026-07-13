import {Router} from 'express';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: "Get all subscriptions route" }));

export default subscriptionRouter;