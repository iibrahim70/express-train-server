import { Router } from 'express';
import { TrainControllers } from './train.controller';

const router = Router();

router.get('/', TrainControllers.getAllTrains);
router.get('/:trainId', TrainControllers.getSingleTrain);

router.post('/create-train', TrainControllers.createTrain);
router.patch('/update-train/:trainId', TrainControllers.updateTrain);

export const TrainRoutes = router;
