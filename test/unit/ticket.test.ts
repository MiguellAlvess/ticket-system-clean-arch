import { Ticket } from "../../src/domain/ticket"

describe("Ticket", () => {
  it("should ticket can be cancelled", () => {
    const ticket = Ticket.create("", "teste@gmail.com", 190)
    ticket.cancel()
    expect(ticket.getStatus()).toBe("cancelled")
  })
  it("should throw an error if email is invalid", () => {
    expect(() => Ticket.create("", "fakeemail", 190)).toThrow(
      new Error("Invalid email")
    )
  })
})
