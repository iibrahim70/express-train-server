import { Model } from 'mongoose';

export interface IStation {
  stationName: string;
  stationCode: string;
  location: string;
}

// for creating a static
export interface StationModel extends Model<IStation> {
  isStationExistsByStationCode(stationCode: string): Promise<IStation | null>;
}
