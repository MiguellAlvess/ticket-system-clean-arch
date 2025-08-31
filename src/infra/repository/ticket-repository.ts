import { Ticket } from "../../domain/ticket.js"
import { db } from "../database/db.js"

export interface TicketRepository {
  saveTicket(ticket: Ticket): Promise<void>
  getTicket(ticketId: string): Promise<Ticket>
}
export class TicketRepositoryDatabase implements TicketRepository {
  async saveTicket(ticket: Ticket) {
    await db.ticket.create({
      data: {
        ticket_id: ticket.ticketId,
        event_id: ticket.eventId,
        email: ticket.email,
        ticket_price_in_cents: ticket.ticketPriceInCents,
        status: ticket.status,
        date: ticket.date,
      },
    })
  }

  async getTicket(ticketId: string) {
    const ticket = await db.ticket.findUnique({
      where: { ticket_id: ticketId },
    })
    if (!ticket) {
      throw new Error("Ticket not found")
    }
    return new Ticket(
      ticket.ticket_id,
      ticket.event_id,
      ticket.email,
      ticket.ticket_price_in_cents,
      ticket.status,
      ticket.date
    )
  }
}
