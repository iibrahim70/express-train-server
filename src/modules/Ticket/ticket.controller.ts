import httpStatus from 'http-status';
import catchAsync from '../../helpers/catchAsync';
import sendResponse from '../../helpers/sendResponse';
import { TicketServices } from './ticket.service';

const calculateTicketPrice = catchAsync(async (req, res) => {
  const result = await TicketServices.calculateTicketPriceFromDB(req?.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket price calculated successfully!',
    data: result,
  });
});

const purchaseTicket = catchAsync(async (req, res) => {
  const result = await TicketServices.purchaseTicketFromDB(
    req?.user,
    req?.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Ticket purchased successfully!',
    data: result,
  });
});

export const TicketControllers = {
  calculateTicketPrice,
  purchaseTicket,
};
