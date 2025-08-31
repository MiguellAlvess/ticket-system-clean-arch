import crypto from "crypto"

export class Ticket {
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    readonly email: string,
    readonly ticketPriceInCents: number,
    private status: string,
    readonly date: Date
  ) {}

  static create(eventId: string, email: string, ticketPriceInCents: number) {
    const ticketId = crypto.randomUUID()
    const status = "active"
    const date = new Date()
    return new Ticket(
      ticketId,
      eventId,
      email,
      ticketPriceInCents,
      status,
      date
    )
  }
}
