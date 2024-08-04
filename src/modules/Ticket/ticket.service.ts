import httpStatus from 'http-status';
import ApiError from '../../errors/ApiError';
import { Ticket } from './ticket.model';

const purchaseTicket = async (
  userId: string,
  trainId: string,
  fromStation: string,
  toStation: string,
) => {
  const ticket = await Ticket.purchaseTicket(
    userId,
    trainId,
    fromStation,
    toStation,
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
