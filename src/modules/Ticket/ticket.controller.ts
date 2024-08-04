import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { TicketServices } from './ticket.service';

const purchaseTicket = catchAsync(async (req, res) => {
  const { userId, trainId, fromStation, toStation } = req.body;
  const result = await TicketServices.purchaseTicket(userId, trainId, fromStation, toStation);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket purchased successfully!',
    data: result,
  });
});

export const TicketControllers = {
  purchaseTicket,
};
