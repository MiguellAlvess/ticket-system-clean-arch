import { TicketRepository } from "../../infra/repository/ticket-repository.js"

export class GetTicket {
  constructor(readonly ticketRepository: TicketRepository) {}
  async execute(ticketId: string): Promise<Output> {
    const ticket = await this.ticketRepository.getTicket(ticketId)
    return ticket
  }
}

type Output = {
  ticketId: string
  eventId: string
  email: string
  ticketPriceInCents: number
}
