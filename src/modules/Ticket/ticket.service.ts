import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Ticket } from './ticket.model';
import { JwtPayload } from 'jsonwebtoken';
import { ITicket } from './ticket.interface';
import { User } from '../User/user.model';
import { Train } from '../Train/train.model';

const purchaseTicket = async (user: JwtPayload, payload: ITicket) => {
  // Find the user by email
  const existingUser = await User.isUserExistsByEmail(user.email);

  if (!existingUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found for this email!');
  }

  // Check if the train exists
  const train = await Train.findById(payload.trainId);
  if (!train) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Train not found!');
  }

  // Purchase the ticket using the static method from Ticket model
  const ticket = await Ticket.purchaseTicket(
    user.id,
    payload.trainId,
    payload.fromStation,
    payload.toStation,
  );

  if (!ticket) {
    throw new ApiError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Ticket purchase failed',
    );
  }

  return ticket;
};

export const TicketServices = {
  purchaseTicket,
};
