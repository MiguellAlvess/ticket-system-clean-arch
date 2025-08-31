import { PurchaseTicket } from "../src/application/usecase/purchase-ticket"
import { GetTicket } from "../src/application/usecase/get-ticket"
import { TicketRepositoryDatabase } from "../src/infra/repository/ticket-repository"
import { EventRepositoryDatabase } from "../src/infra/repository/event-repository"

describe("Purchase Ticket", () => {
  it("should purchase a ticket for an event", async () => {
    const ticketRepository = new TicketRepositoryDatabase()
    const eventRepository = new EventRepositoryDatabase()
    const purchase = new PurchaseTicket(ticketRepository, eventRepository)
    const getTicket = new GetTicket(ticketRepository)
    const inputPurchaseTicket = {
      eventId: "51e88e26-c2f8-4f0c-8a75-498fd9dbedf7",
      email: `test+${crypto.randomUUID()}@gmail.com`,
    }
    const outputPurchaseTicket = await purchase.execute(inputPurchaseTicket)
    const outputGetTicket = await getTicket.execute(
      outputPurchaseTicket.ticketId
    )
    expect(outputPurchaseTicket.ticketId).toBeDefined()
    expect(outputGetTicket.eventId).toBe("51e88e26-c2f8-4f0c-8a75-498fd9dbedf7")
    expect(outputGetTicket.email).toBe(inputPurchaseTicket.email)
    expect(outputGetTicket.ticketPriceInCents).toBe(100)
  })
})
