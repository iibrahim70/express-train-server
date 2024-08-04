import { Schema, model } from 'mongoose';
import { IStation, StationModel } from './station.interface';

// Define the schema for the Station model
const stationSchema = new Schema<IStation, StationModel>(
  {
    stationName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    stationCode: {
      type: String,
      required: true,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Static method to check if a station with the given code exists
stationSchema.statics.isStationExistsByStationCode = async function (
  stationCode: number,
) {
  // Check for a station with the specified stationCode
  const existingStation = await Station.findOne({ stationCode });
  return existingStation;
};

// Create the Station model using the schema
export const Station = model<IStation, StationModel>('Station', stationSchema);
