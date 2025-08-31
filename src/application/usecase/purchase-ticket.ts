import { Ticket } from "../../domain/ticket.js"
import { EventRepository } from "../../infra/repository/event-repository.js"
import { TicketRepository } from "../../infra/repository/ticket-repository.js"

export class PurchaseTicket {
  constructor(
    readonly ticketRepository: TicketRepository,
    readonly eventRepository: EventRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const event = await this.eventRepository.getEvent(input.eventId)
    const ticket = Ticket.create(
      input.eventId,
      input.email,
      event.eventPriceInCents
    )
    await this.ticketRepository.saveTicket(ticket)
    return { ticketId: ticket.ticketId }
  }
}

type Input = {
  eventId: string
  email: string
}

type Output = {
  ticketId: string
}
