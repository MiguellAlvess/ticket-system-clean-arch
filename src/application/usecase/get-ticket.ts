import DatabaseConnection from "../../infra/database/database-connection.js"

export class GetTicket {
  constructor(readonly connection: DatabaseConnection) {}
  async execute(ticketId: string): Promise<Output> {
    const output = await this.connection.query((prisma) =>
      prisma.ticket.findUnique({
        where: { ticket_id: ticketId },
        include: { event: true },
      })
    )
    if (!output) throw new Error("Ticket not found")
    return {
      ticketId: output.ticket_id,
      eventId: output.event_id,
      email: output.email,
      ticketPriceInCents: output.ticket_price_in_cents,
      eventDescription: output.event.description,
    }
  }
}

type Output = {
  ticketId: string
  eventId: string
  email: string
  ticketPriceInCents: number
  eventDescription: string
}
