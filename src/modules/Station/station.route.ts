import { Router } from 'express';
import { StationControllers } from './station.controller';

const router = Router();

router.get('/', StationControllers.getAllStations);
router.get('/:stationId', StationControllers.getSingleStation);
router.post('/create-station', StationControllers.createStation);
router.patch('/update-station/:stationId', StationControllers.updateStation);

export const StationRoutes = router;
