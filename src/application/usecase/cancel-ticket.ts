import { TicketRepository } from "../../infra/repository/ticket-repository.js"

export class CancelTicket {
  constructor(readonly ticketRepository: TicketRepository) {}

  async execute(ticketId: string): Promise<void> {
    const ticket = await this.ticketRepository.getTicket(ticketId)
    ticket.cancel()
    await this.ticketRepository.updateTicketStatus(ticketId, ticket.getStatus())
  }
}
