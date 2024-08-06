import mongoose from 'mongoose';
import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { JwtPayload } from 'jsonwebtoken';
import { ITicket } from './ticket.interface';
import { User } from '../User/user.model';
import { Train } from '../Train/train.model';
import { Wallet } from '../Wallet/wallet.model';
import { generateTicketNumber } from '../../helpers/generateTicketNumber';
import { Ticket } from './ticket.model';

const FARE_PER_STATION = 50;

const calculateTicketPriceFromDB = async (payload: ITicket) => {
  // Check if the train exists
  const train = await Train.findById(payload.trainId);

  if (!train) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Train not found!');
  }

  // Ensure the provided stations are part of the train's route
  const stops = train.stops; // Array of stop objects

  // Extract station codes from stops
  const stationCodes = stops.map((stop) => stop.stationCode);

  const fromIndex = stationCodes.indexOf(payload.fromStation);
  const toIndex = stationCodes.indexOf(payload.toStation);

  if (fromIndex === -1 || toIndex === -1) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid stations provided.');
  }

  if (fromIndex >= toIndex) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The "fromStation" must be before the "toStation".',
    );
  }

  // Calculate the number of stations between fromStation and toStation
  const numberOfStations = toIndex - fromIndex;

  // Calculate the price
  const price = numberOfStations * FARE_PER_STATION;

  return { price };
};

const purchaseTicketFromDB = async (user: JwtPayload, payload: ITicket) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Find the user by email
    const existingUser = await User.isUserExistsByEmail(user.email);
    if (!existingUser) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this email!');
    }

    // Calculate the ticket price
    const { price } = await calculateTicketPriceFromDB(payload);

    // Find wallet by userId
    const wallet = await Wallet.findOne({ userId: existingUser._id }).session(session);
    if (!wallet) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Wallet not found for this user!');
    }

    // Check if the wallet has sufficient balance
    if (wallet.balance < price) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient funds!');
    }

    // Deduct funds from wallet balance
    wallet.balance -= price;
    wallet.transactions.push({
      amount: -price, // Negative amount for deduction
      date: new Date(),
      type: 'debit',
      ref: 'Ticket Purchased'
    });
    await wallet.save({ session });

    // Generate ticket number based on train name, code, year, and last two digits of user ID
    const ticketNumber = generateTicketNumber(payload.fromStation, payload.toStation);

    // Save ticket information
    const ticketPayload = {
      ...payload, // Assuming payload contains ticket details like event, seat, trainName, trainCode
      userId: existingUser._id,
      price,
      purchaseDate: new Date(),
      ticketNumber,
    };

    const result = await Ticket.create([ticketPayload], { session });

    // Commit the transaction
    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (error) {
    // Abort the transaction in case of an error
    await session.abortTransaction();
    await session.endSession();
    
    // Re-throw the error to be handled by the caller
    throw error;
  }
};

export const TicketServices = {
  calculateTicketPriceFromDB,
  purchaseTicketFromDB,
};