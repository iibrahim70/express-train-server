import { Schema, model } from 'mongoose';
import { IStop, ITrain, TrainModel } from './train.interface';

// Define the schema for the TrainSchedule subdocument
const trainStopSchema = new Schema<IStop>({
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
});

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
    stops: {
      type: [trainStopSchema],
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
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
