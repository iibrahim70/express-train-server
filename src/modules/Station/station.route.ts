import { Router } from 'express';

const router = Router();

router.get('/');
router.get('/:stationId');
router.post('/create-station');
router.patch('/update-station/:stationId');

export const StationRoutes = router;
