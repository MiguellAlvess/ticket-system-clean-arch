import { Ticket } from "../../domain/ticket.js"
import DatabaseConnection from "../database/database-connection.js"

export interface TicketRepository {
  saveTicket(ticket: Ticket): Promise<void>
  getTicket(ticketId: string): Promise<Ticket>
  updateTicketStatus(ticketId: string, status: string): Promise<void>
}

export class TicketRepositoryDatabase implements TicketRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async saveTicket(ticket: Ticket) {
    await this.connection.query((prisma) =>
      prisma.ticket.create({
        data: {
          ticket_id: ticket.ticketId,
          event_id: ticket.eventId,
          email: ticket.email.value,
          ticket_price_in_cents: ticket.ticketPriceInCents,
          status: ticket.getStatus(),
          date: ticket.date,
        },
      })
    )
  }

  async getTicket(ticketId: string) {
    const ticket = await this.connection.query((prisma) =>
      prisma.ticket.findUnique({
        where: { ticket_id: ticketId },
      })
    )

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

  async updateTicketStatus(ticketId: string, status: string) {
    await this.connection.query((prisma) =>
      prisma.ticket.update({
        where: { ticket_id: ticketId },
        data: { status },
      })
    )
  }
}
