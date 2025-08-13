const Ticket = require('../../models/ticket.model');
const { v4: uuidv4 } = require('uuid');

class TicketDAO {
    async createTicket(amount, purchaser) {
        const newTicket = await Ticket.create({
            code: uuidv4(),
            amount,
            purchaser
        });
        return newTicket;
    }
}

module.exports = new TicketDAO();