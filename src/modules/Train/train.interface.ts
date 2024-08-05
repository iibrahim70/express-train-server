import { Model, ObjectId } from 'mongoose';

export interface ITrain {
  trainName: string;
  trainCode: string;
  stops: IStop[];
  createdBy: ObjectId;
}

export interface IStop {
  stationCode: string;
  arrivalTime: Date;
  departureTime: Date;
}

export interface TrainModel extends Model<ITrain> {
  isTrainExistsByTrainCode(trainCode: string): Promise<ITrain | null>;
}
