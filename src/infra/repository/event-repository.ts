import { Event } from "../../domain/event.js"
import DatabaseConnection from "../database/database-connection.js"

export interface EventRepository {
  getEvent(eventId: string): Promise<Event>
}

export class EventRepositoryDatabase implements EventRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async getEvent(eventId: string) {
    const event = await this.connection.query((prisma) =>
      prisma.event.findUnique({
        where: { event_id: eventId },
      })
    )

    if (!event) {
      throw new Error("Event not found")
    }

    return new Event(
      event.event_id,
      event.description,
      event.event_price_in_cents
    )
  }
}
