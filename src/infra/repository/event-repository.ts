import { db } from "../database/db.js"
import { Event } from "../../domain/event.js"

export interface EventRepository {
  getEvent(eventId: string): Promise<Event>
}
export class EventRepositoryDatabase implements EventRepository {
  async getEvent(eventId: string) {
    const event = await db.event.findUnique({
      where: { event_id: eventId },
    })
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
