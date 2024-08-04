import {  Model } from 'mongoose';

export interface ITrain {
  trainName: string;
  trainCode: string;
  schedule: ITrainSchedule[];
}

export interface ITrainSchedule {
  stationCode: string;
  arrivalTime: Date;
  departureTime: Date;
}

export interface TrainModel extends Model<ITrain> {
  isTrainExistsByTrainCode(trainCode: string): Promise<ITrain | null>;
}
