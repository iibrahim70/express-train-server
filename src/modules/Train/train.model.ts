import { Schema, model } from 'mongoose';
import { ITrain, ITrainSchedule, TrainModel } from './train.interface';

// Define the schema for the TrainSchedule subdocument
const trainScheduleSchema = new Schema<ITrainSchedule>(
  {
    stationCode: {
      type: String,
      required: true,
    },
    arrivalTime: {
      type: Date,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
  },
  { _id: false } // Prevent Mongoose from creating an _id field for sub documents
);

// Define the schema for the Train model
const trainSchema = new Schema<ITrain, TrainModel>(
  {
    trainName: {
      type: String,
      required: true,
    },
    trainCode: {
      type: String,
      required: true,
      unique: true,
    },
    schedule: {
      type: [trainScheduleSchema],
      required: true,
    },
  },
  { timestamps: true }, // Adds createdAt and updatedAt timestamps
);

// Static method to check if a train with the given code exists
trainSchema.statics.isTrainExistsByTrainCode = async function (
  trainCode: string,
) {
  // Check for a train with the specified trainCode
  const existingTrain = await Train.findOne({ trainCode });
  return existingTrain;
};

// Create the Train model using the schema
export const Train = model<ITrain, TrainModel>('Train', trainSchema);
