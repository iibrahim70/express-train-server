import { Model } from 'mongoose';

export interface IStation {
  stationName: string;
  location: string;
  stationCode: string;
}

// for creating a static
export interface StationModel extends Model<IStation> {
  isStationExistsByStationCode(stationCode: string): Promise<IStation | null>;
}
