import { Router } from 'express';
import { TicketControllers } from './ticket.controller';

const router = Router();

router.post('/purchase', TicketControllers.purchaseTicket);

export const TicketRoutes = router;
