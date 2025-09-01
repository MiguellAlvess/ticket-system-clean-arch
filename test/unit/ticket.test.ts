import { Ticket } from "../../src/domain/ticket"

describe("Ticket", () => {
  it("should ticket can be cancelled", () => {
    const ticket = Ticket.create("", "teste@gmail.com", 190)
    ticket.cancel()
    expect(ticket.getStatus()).toBe("cancelled")
  })
})
