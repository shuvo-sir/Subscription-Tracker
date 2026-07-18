import {Router} from 'express';
import { createSubscription, getUserSubscriptions } from '../controllers/subscription.controller.js';
import authorize from '../middlewares/auth.middleware.js';


const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => res.send({ title: "Get all subscriptions route" }));
subscriptionRouter.get('/:id', (req, res) => res.send({ title: "Get subscription by ID route" }));
subscriptionRouter.post('/',authorize, createSubscription);
subscriptionRouter.put('/:id', (req, res) => res.send({ title: "Update subscription by ID route" }));
subscriptionRouter.delete('/:id', (req, res) => res.send({ title: "Delete subscription by ID route" }));
subscriptionRouter.get('/user/:id', authorize, getUserSubscriptions);

export default subscriptionRouter;