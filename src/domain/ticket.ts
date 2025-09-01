import crypto from "crypto"
import Email from "./email.js"

export class Ticket {
  email: Email
  constructor(
    readonly ticketId: string,
    readonly eventId: string,
    email: string,
    readonly ticketPriceInCents: number,
    private status: string,
    readonly date: Date
  ) {
    this.email = new Email(email)
  }

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

  cancel() {
    const today = new Date()
    const diff = (today.getTime() - this.date.getTime()) / (1000 * 60 * 60)
    if (diff > 24)
      throw new Error("Cancellation can only be done within 24 hours")
    this.status = "cancelled"
  }

  getStatus() {
    return this.status
  }
}
