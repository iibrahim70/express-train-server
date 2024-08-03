import { Schema, model } from 'mongoose';
import { IStation } from './station.interface';

// Define the schema for the Station model
const stationSchema = new Schema<IStation>(
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
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Create the Station model using the schema
export const Station = model<IStation>('Station', stationSchema);
